import { useEffect, useState } from "react";
import "./index.css";
import { toast } from "react-toastify";
import apiClient from "../../service/apiClient";
import {
  ClockIcon,
  CurrencyRupeeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/dashboard");
        setdata(response.data);
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
    return <div className="dasboard-loading">Loading...</div>;
  }

  if (!data) {
    return <div className="dasboard-error">No data found</div>;
  }

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
              <p>&#8377;{data.todaySales.toFixed(2)}</p>
            </div>
          </div>
          <div className="stats-card">
            <div className="stats-icon">
              <ShoppingBagIcon />
            </div>
            <div className="stats-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
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
                {data.recentOrders.map((order: any) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId.substring(0, 8)}...</td>
                    <td>{order.customerName}</td>
                    <td>&#8377;{order.grandTotal.toFixed(2)}</td>
                    <td>
                      <span
                        className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.paymentDetails.paymentStatus.toLowerCase()}`}
                      >
                        {order.paymentDetails.paymentStatus}
                      </span>
                    </td>
                    <td>
                      {new Date(order.orderCreatedAt).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
