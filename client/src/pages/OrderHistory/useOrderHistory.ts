import { useEffect, useState, useMemo, useRef } from "react";
import {
  latestOrders,
  type OrderResponse,
} from "../../service/OrderService";
import type { FilterType } from "./types";
import { getStartOfDay, getEndOfDay } from "./utils";

const ITEMS_PER_PAGE = 8;

export interface DateGroup {
  dateLabel: string;
  dateKey: string;
  orders: OrderResponse[];
}

export const useOrderHistory = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<FilterType>("today");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [showRecepit, setShowRecepit] = useState(false);
  const recepitRef = useRef<HTMLDivElement>(null);

  // Fetch orders once on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, customFrom, customTo]);

  // Filter orders by active filter
  const filteredOrders = useMemo(() => {
    const now = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.orderCreatedAt);

      switch (activeFilter) {
        case "today": {
          return (
            orderDate >= getStartOfDay(now) && orderDate <= getEndOfDay(now)
          );
        }
        case "week": {
          const startOfWeek = getStartOfDay(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return orderDate >= startOfWeek && orderDate <= getEndOfDay(now);
        }
        case "month": {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          startOfMonth.setHours(0, 0, 0, 0);
          return orderDate >= startOfMonth && orderDate <= getEndOfDay(now);
        }
        case "custom": {
          if (!customFrom && !customTo) return true;
          const from = customFrom
            ? getStartOfDay(new Date(customFrom))
            : new Date(0);
          const to = customTo
            ? getEndOfDay(new Date(customTo))
            : new Date(8640000000000000);
          return orderDate >= from && orderDate <= to;
        }
        default:
          return true;
      }
    });
  }, [orders, activeFilter, customFrom, customTo]);

  // Group filtered orders by calendar day
  const groupedOrders = useMemo<DateGroup[]>(() => {
    const groups: DateGroup[] = [];
    const map = new Map<string, OrderResponse[]>();

    for (const order of filteredOrders) {
      const d = new Date(order.orderCreatedAt);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(order);
    }

    const sortedKeys = Array.from(map.keys()).sort((a, b) =>
      b.localeCompare(a),
    );

    for (const key of sortedKeys) {
      const d = new Date(key + "T00:00:00");
      const today = getStartOfDay(new Date());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let label: string;
      if (d.getTime() === today.getTime()) {
        label = "Today";
      } else if (d.getTime() === yesterday.getTime()) {
        label = "Yesterday";
      } else {
        label = d.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      groups.push({ dateLabel: label, dateKey: key, orders: map.get(key)! });
    }

    return groups;
  }, [filteredOrders]);

  // Flat list for total count / pagination maths
  const allFilteredOrders = useMemo(
    () => groupedOrders.flatMap((g) => g.orders),
    [groupedOrders],
  );

  const totalPages = Math.ceil(allFilteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Paginated slice that preserves date grouping
  const paginatedGroups = useMemo<DateGroup[]>(() => {
    const result: DateGroup[] = [];
    let remaining = ITEMS_PER_PAGE;
    let skipped = 0;

    for (const group of groupedOrders) {
      if (remaining <= 0) break;

      for (let i = 0; i < group.orders.length; i++) {
        if (skipped < startIndex) {
          skipped++;
          continue;
        }
        if (remaining <= 0) break;

        let existing = result.find((r) => r.dateKey === group.dateKey);
        if (!existing) {
          existing = {
            dateLabel: group.dateLabel,
            dateKey: group.dateKey,
            orders: [],
          };
          result.push(existing);
        }
        existing.orders.push(group.orders[i]);
        remaining--;
      }
    }

    return result;
  }, [groupedOrders, startIndex]);

  // Navigation helpers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Filter interaction helpers
  const handleFilterClick = (filter: FilterType) => {
    if (filter === "custom") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      setCustomFrom("");
      setCustomTo("");
    }
    setActiveFilter(filter);
  };

  const clearCustomDates = () => {
    setCustomFrom("");
    setCustomTo("");
  };

  // Receipt helpers
  const handleOpenRecepit = (order: OrderResponse) => {
    setSelectedOrder(order);
    setShowRecepit(true);
  };

  const handleCloseRecepit = () => {
    setShowRecepit(false);
    setSelectedOrder(null);
  };

  const handlePrintRecepit = () => {
    window.print();
  };

  return {
    // state
    loading,
    activeFilter,
    customFrom,
    customTo,
    showDatePicker,
    selectedOrder,
    showRecepit,
    recepitRef,
    // derived
    filteredOrders,
    paginatedGroups,
    allFilteredOrders,
    totalPages,
    startIndex,
    currentPage,
    ITEMS_PER_PAGE,
    // actions
    setCustomFrom,
    setCustomTo,
    goToPage,
    handleFilterClick,
    clearCustomDates,
    handleOpenRecepit,
    handleCloseRecepit,
    handlePrintRecepit,
  };
};
