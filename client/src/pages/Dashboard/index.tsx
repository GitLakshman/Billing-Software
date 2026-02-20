import { useEffect, useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import apiClient from "../../service/apiClient";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

interface DashboardOrder {
  orderId: string;
  customerName: string;
  grandTotal: number;
  paymentMethod: string;
  orderCreatedAt: string;
  paymentDetails: {
    paymentStatus: string;
  };
}

interface DashboardData {
  todaySales: number;
  todayOrderCount: number;
  recentOrders: DashboardOrder[];
}

const ITEMS_PER_PAGE = 8;

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/dashboard");
        setData(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!data) {
    return <div className="dashboard-error">No data found</div>;
  }

  const recentOrders = data.recentOrders ?? [];
  const totalPages = Math.ceil(recentOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = recentOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stats-card">
            <div className="stats-icon">
              <CurrencyRupeeIcon />
            </div>
            <div className="stats-content">
              <h3>Today's Sales</h3>
              <p>&#8377;{(data.todaySales ?? 0).toFixed(2)}</p>
            </div>
          </div>
          <div className="stats-card">
            <div className="stats-icon">
              <ShoppingBagIcon />
            </div>
            <div className="stats-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount ?? 0}</p>
            </div>
          </div>
        </div>
        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <ClockIcon />
            Recent Orders
          </h3>
          <div className="order-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty-orders">
                      No recent orders found
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td data-label="Order Id">
                        {order.orderId.substring(0, 8)}...
                      </td>
                      <td data-label="Customer">{order.customerName}</td>
                      <td data-label="Amount">
                        &#8377;{(order.grandTotal ?? 0).toFixed(2)}
                      </td>
                      <td data-label="Payment">
                        <span
                          className={`payment-method ${order.paymentMethod?.toLowerCase()}`}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td data-label="Status">
                        <span
                          className={`status-badge ${order.paymentDetails?.paymentStatus?.toLowerCase()}`}
                        >
                          {order.paymentDetails?.paymentStatus ?? "PENDING"}
                        </span>
                      </td>
                      <td data-label="Time">
                        {new Date(order.orderCreatedAt).toLocaleString(
                          "en-US",
                          {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          },
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <p className="pagination-info">
                Showing {startIndex + 1}–
                {Math.min(startIndex + ITEMS_PER_PAGE, recentOrders.length)} of{" "}
                {recentOrders.length} orders
              </p>
              <div className="pagination-buttons">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn pagination-nav"
                  aria-label="Previous page"
                >
                  <ChevronLeftIcon />
                  <span className="pagination-nav-text">Prev</span>
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`pagination-btn pagination-number ${
                      page === currentPage ? "active" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="pagination-btn pagination-nav"
                  aria-label="Next page"
                >
                  <span className="pagination-nav-text">Next</span>
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
