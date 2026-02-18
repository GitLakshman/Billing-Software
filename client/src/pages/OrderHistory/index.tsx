import { useEffect, useState } from "react";
import {
  latestOrders,
  type OrderItemResponse,
  type OrderResponse,
} from "../../service/OrderService";

const ITEMS_PER_PAGE = 8;

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, isLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await latestOrders();
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        isLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const formatItems = (items: OrderItemResponse[]) => {
    return items
      .map((item) => `${item.itemName} x ${item.itemsCount}`)
      .join(", ");
  };

  const formatDate = (date: string) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    } as const;
    return new Date(date).toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-4">No orders found</div>;
  }

  return (
    <div className="p-6 h-[calc(100vh-5rem)] box-border bg-[#2c3335] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-slate-100">All Orders</h2>
      <div className="w-full overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Customer
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Items
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Total
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Payment
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Status
              </th>
              <th className="font-semibold text-left text-sm px-5 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedOrders.map((order) => (
              <tr
                key={order.orderId}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="align-middle px-5 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {order.orderId}
                </td>
                <td className="align-middle px-5 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {order.customerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.customerPhone}
                  </div>
                </td>
                <td className="align-middle px-5 py-4 text-sm text-gray-700">
                  {formatItems(order.items)}
                </td>
                <td className="align-middle px-5 py-4 text-sm text-gray-800 font-medium whitespace-nowrap">
                  &#8377;{order.grandTotal}
                </td>
                <td className="align-middle px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {order.paymentMethod}
                </td>
                <td className="align-middle px-5 py-4 whitespace-nowrap">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      order.paymentDetails.paymentStatus === "COMPLETED"
                        ? "bg-green-700 text-white"
                        : "bg-yellow-400 text-gray-900"
                    }`}
                  >
                    {order.paymentDetails.paymentStatus || "PENDING"}
                  </span>
                </td>
                <td className="align-middle px-5 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {formatDate(order.orderCreatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-400">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, orders.length)} of{" "}
            {orders.length} orders
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-sm rounded bg-gray-700 text-slate-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  page === currentPage
                    ? "bg-green-600 text-white font-semibold"
                    : "bg-gray-700 text-slate-300 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-sm rounded bg-gray-700 text-slate-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
