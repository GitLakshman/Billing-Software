import "./index.css";
import "./print.css";
import type { OrderResponse } from "../../service/OrderService";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface RecepitProps {
  orderDetails: OrderResponse;
  onClose: () => void;
  onPrint: () => void;
}

const Recepit = ({ orderDetails, onClose, onPrint }: RecepitProps) => {
  return (
    <div className="recepit-popup text-gray-900" id="printable-receipt">
      <h3 className="text-center mb-4 font-bold text-lg">
        SRI VENKATESWARA VETERINARY MEDICINES AND PET CARE
      </h3>
      <hr className="my-3" />
      <div className="flex justify-center items-center gap-2 mb-4">
        <h3 className="font-semibold text-lg">RECEIPT</h3>
        <CheckBadgeIcon width={25} className="text-green-500" />
      </div>
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
            <span>&#8377;{(item.itemPrice * item.itemsCount).toFixed(2)}</span>
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
          <strong>Discount:</strong>
        </span>
        <span>{orderDetails.discount}%</span>
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
      <div className="recepit-popup-buttons flex justify-end gap-3 mt-4">
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
  );
};

export default Recepit;
