import { PrinterIcon } from "@heroicons/react/24/outline";
import type { OrderResponse } from "../../service/OrderService";
import type { DateGroup } from "../../pages/OrderHistory/useOrderHistory";
import { formatItems, formatTime } from "../../pages/OrderHistory/utils";

interface OrderTableProps {
  groups: DateGroup[];
  onOpenReceipt: (order: OrderResponse) => void;
}

const OrderTable = ({ groups, onOpenReceipt }: OrderTableProps) => {
  return (
    <>
      {groups.map((group) => (
        <div key={group.dateKey} className="order-date-group">
          {/* Date group header */}
          <div className="order-date-group-header">
            <div className="order-date-group-line" />
            <span className="order-date-group-label">{group.dateLabel}</span>
            <span className="order-date-group-count">
              {group.orders.length} order{group.orders.length !== 1 ? "s" : ""}
            </span>
            <div className="order-date-group-line" />
          </div>

          {/* Table */}
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
                  <th>Time</th>
                  <th>Receipt</th>
                </tr>
              </thead>
              <tbody>
                {group.orders.map((order) => (
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
                    <td data-label="Time">
                      {formatTime(order.orderCreatedAt)}
                    </td>
                    <td data-label="Receipt">
                      <button
                        className="order-receipt-btn"
                        title="View Receipt"
                        onClick={() => onOpenReceipt(order)}
                      >
                        <PrinterIcon className="text-black" width={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderTable;
