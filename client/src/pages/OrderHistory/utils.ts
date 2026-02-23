import type { OrderItemResponse } from "../../service/OrderService";

/** Returns a new Date set to 00:00:00.000 on the same calendar day. */
export const getStartOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/** Returns a new Date set to 23:59:59.999 on the same calendar day. */
export const getEndOfDay = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/** Formats a list of order items into a human-readable string. */
export const formatItems = (items: OrderItemResponse[]): string =>
  items.map((item) => `${item.itemName} x ${item.itemsCount}`).join(", ");

/** Formats an ISO date string into a localised HH:MM time string. */
export const formatTime = (date: string): string =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

/** Returns a compact window of page numbers centered around `currentPage`. */
export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible = 5,
): number[] => {
  const pages: number[] = [];
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
};
