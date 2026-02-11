import { PlusIcon, ShoppingCartIcon } from "lucide-react";
import type { ItemResponse } from "../../../service/ItemService";

const Item = ({ itemId, itemName, itemImageUrl, itemPrice }: ItemResponse) => {
  const handleOnClick = () => {
    console.log("Item clicked", itemId);
  };

  return (
    <div className="flex items-center py-3 px-3 bg-gray-900 rounded-md shadow-sm h-full hover:scale-105 transition-all duration-150 cursor-pointer">
      <div className="relative mr-4">
        <img
          src={itemImageUrl}
          alt={itemName}
          className="w-12 h-12 rounded-md bg-gray-500"
        />
      </div>
      <div className="grow p-1">
        <h6 className="text-gray-100 text-sm mb-1 font-semibold">{itemName}</h6>
        <p className="text-gray-100 text-sm font-semibold">
          &#8377;{itemPrice}
        </p>
      </div>
      <div className="flex flex-col justify-between items-center ms-3 h-full">
        <ShoppingCartIcon className="text-xl text-yellow-500"></ShoppingCartIcon>
        <button
          className="bg-green-600 text-white text-sm p-1 rounded hover:bg-green-700"
          onClick={handleOnClick}
        >
          <PlusIcon width={15} height={15} />
        </button>
      </div>
    </div>
  );
};

export default Item;
