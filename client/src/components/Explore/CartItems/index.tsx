import { useContext } from "react";
import { AppContext } from "../../../context";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";

const CartItems = () => {
  const { cartItems, removeFromCart, updateItemCount } = useContext(AppContext);
  return (
    <div className="p-3 h-full" style={{ overflowY: "auto" }}>
      {cartItems.length === 0 ? (
        <p className="font-light">Your Cart is Empty!</p>
      ) : (
        <div className="cart-items-list">
          {cartItems?.map((cartItem, index) => (
            <div key={index} className="cart-item mb-3 p-3 bg-gray-900 rounded">
              <div className="flex justify-between items-center mb-2">
                <h6 className="mb-0 font-light">{cartItem.itemName}</h6>
                <p className="mb-0 font-light">
                  &#8377;
                  {(
                    Number(cartItem.itemPrice) *
                    Number(cartItem.itemsCount ?? 0)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 bg-red-400 rounded-sm hover:opacity-95 transition-colors duration-200 cursor-pointer"
                    disabled={cartItem.itemsCount === 1}
                    onClick={() =>
                      Number(
                        updateItemCount(
                          cartItem.itemId ?? "",
                          (cartItem.itemsCount ?? 0) - 1,
                        ),
                      )
                    }
                  >
                    <MinusIcon size={16} />
                  </button>
                  <span className="font-light">{cartItem.itemsCount}</span>
                  <button
                    className="p-1 bg-green-400 rounded-sm hover:opacity-95 transition-colors duration-200 cursor-pointer"
                    onClick={() =>
                      updateItemCount(
                        cartItem.itemId ?? "",
                        (cartItem.itemsCount ?? 0) + 1,
                      )
                    }
                  >
                    <PlusIcon size={16} />
                  </button>
                </div>
                <button
                  className="p-1 bg-red-400 rounded-sm hover:opacity-95 transition-colors duration-200 cursor-pointer"
                  style={{ width: "auto" }}
                  onClick={() => removeFromCart(cartItem.itemId ?? "")}
                >
                  <Trash2Icon size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartItems;
