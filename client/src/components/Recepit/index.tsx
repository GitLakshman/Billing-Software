import "./index.css";
import "./print.css";
import type { OrderResponse } from "../../service/OrderService";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const Recepit = ({
  orderDetails,
  onClose,
  onPrint,
}: {
  orderDetails: OrderResponse;
  onClose: () => void;
  onPrint: () => void;
}) => {
  return (
    <div className="recepit-popup-overlay text-gray-900">
      <div className="recepit-popup">
        <div className="flex justify-center items-center mb-4">
          <CheckBadgeIcon width={40} className="text-green-500" />
        </div>
        <h3 className="text-center mb-4 font-bold text-xl"> Order Receipt</h3>
        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone:</strong> {orderDetails.customerPhone}
        </p>
        <hr className="my-3" />
        <h5 className="mb-3 font-bold">Items Ordered</h5>
        <div className="cart-items-scrollable">
          {orderDetails.items.map((item) => (
            <div key={item.itemId} className="flex justify-between">
              <span>
                {item.itemName} x {item.itemsCount}
              </span>
              <span>
                &#8377;{(item.itemPrice * item.itemsCount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between mb-2">
          <span>
            <strong>Sub Total:</strong>
          </span>
          <span>&#8377;{orderDetails.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>
            <strong>Tax (1%):</strong>
          </span>
          <span>&#8377;{orderDetails.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>
            <strong>Grand Total:</strong>
          </span>
          <span>&#8377;{orderDetails.grandTotal.toFixed(2)}</span>
        </div>
        <p>
          <strong>Payment Method:</strong> {orderDetails.paymentMethod}
        </p>
        {orderDetails.paymentMethod === "UPI" && (
          <>
            <p>
              <strong>Razorpay Order ID:</strong>{" "}
              {orderDetails.paymentDetails?.razorpayOrderId ?? "N/A"}
            </p>
            <p>
              <strong>Razorpay Payment ID:</strong>{" "}
              {orderDetails.paymentDetails?.razorpayPaymentId ?? "N/A"}
            </p>
          </>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={onPrint}
          >
            Print
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recepit;
