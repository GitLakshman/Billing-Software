import { useEffect, useState } from "react";
import {
  latestOrders,
  type OrderItemResponse,
  type OrderResponse,
} from "../../service/OrderService";
import "./index.css";

const ITEMS_PER_PAGE = 8;

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
    return <div className="order-history-loading">Loading...</div>;
  }

  if (orders.length === 0) {
    return <div className="order-history-empty">No orders found</div>;
  }

  return (
    <div className="order-history-wrapper">
      <h2 className="order-history-title">All Orders</h2>
      <div className="order-history-table-container">
        <table className="order-history-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.orderId}>
                <td data-label="Order Id">{order.orderId}</td>
                <td data-label="Customer">
                  <div className="order-customer-name">
                    {order.customerName}
                  </div>
                  <div className="order-customer-phone">
                    {order.customerPhone}
                  </div>
                </td>
                <td data-label="Items">{formatItems(order.items)}</td>
                <td data-label="Total">&#8377;{order.grandTotal}</td>
                <td data-label="Payment">{order.paymentMethod}</td>
                <td data-label="Status">
                  <span
                    className={`order-status-badge ${
                      order.paymentDetails?.paymentStatus === "COMPLETED"
                        ? "status-completed"
                        : "status-pending"
                    }`}
                  >
                    {order.paymentDetails?.paymentStatus || "PENDING"}
                  </span>
                </td>
                <td data-label="Date">{formatDate(order.orderCreatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="order-pagination">
          <p className="order-pagination-info">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, orders.length)} of{" "}
            {orders.length} orders
          </p>
          <div className="order-pagination-buttons">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="order-page-btn order-page-nav"
            >
              Prev
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`order-page-btn order-page-num ${
                  page === currentPage ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="order-page-btn order-page-nav"
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
