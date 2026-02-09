import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { Trash2Icon } from "lucide-react";
import { deleteItem } from "../../service/ItemService";
import { toast } from "react-toastify";

const ItemList = () => {
  const { items, setItems, categories, setCategories } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const deleteByItemId = async (id: string) => {
    try {
      const res = await deleteItem(id);
      if (res.status === 204) {
        const updatedItems = items.filter((item) => item.itemId !== id);
        setItems(updatedItems);
        setCategories(
          categories.map((category) =>
            category.itemsCount > 0 &&
            category.categoryId === updatedItems[0]?.categoryId
              ? { ...category, itemsCount: category.itemsCount - 1 }
              : category,
          ),
        );
        toast.success("Item Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to Delete Item!");
    }
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      <div className="flex flex-col py-2 ">
        <div className="mb-3 px-2">
          <input
            type="text"
            name="keyword"
            id="keyword"
            placeholder="Search by keyword"
            className="block w-full p-2 bg-white text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-3">
        {filteredItems.map((item, index) => (
          <div key={index} className="w-full">
            <div key={index} className="p-2 rounded-md bg-gray-600">
              <div className="flex items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.itemImageUrl}
                    alt={item.itemName}
                    className="w-15 h-15 border-2 p-1 bg-gray-200 border-white rounded-lg"
                  />
                </div>
                <div className="flex flex-col mr-auto">
                  <h5 className="text-white">{item.itemName}</h5>
                  <p className="text-gray-300 text-sm mb-1">
                    Category: {item.categoryName}
                  </p>
                  <p className="bg-yellow-400 rounded-2xl px-1 text-black max-w-fit text-sm">
                    &#8377;{item.itemPrice}
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-red-500 text-white p-1 rounded-sm hover:opacity-95 transition-colors duration-200"
                  onClick={() => deleteByItemId(item.itemId)}
                >
                  <Trash2Icon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
