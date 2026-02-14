import { useContext } from "react";
import { AppContext } from "../../../context";

const CartSummary = () => {
  const { cartItems } = useContext(AppContext);
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + Number(item.itemPrice ?? "0") * Number(item.itemsCount ?? "0"),
    0,
  );
  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;
  return (
    <div className="mt-2">
      <div className="cart-summary-container">
        <div className="flex justify-between mb-2">
          <span className="font-light">Items Price:</span>
          <span className="font-light">&#8377;{totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-light">Tax(1%):</span>
          <span className="font-light">&#8377;{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-light">Total:</span>
          <span className="font-light">&#8377;{grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 py-1 bg-green-500 rounded">Cash</button>
        <button className="flex-1 py-1 bg-blue-500 rounded">UPI</button>
      </div>
      <div className="flex gap-3 mt-2">
        <button className="flex-1 py-1 bg-yellow-500 rounded">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
