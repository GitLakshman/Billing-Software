import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import Item from "../Item";
import SearchBox from "../../SearchBox";

const ItemsDisplay = ({ selectedCategory }: { selectedCategory: string }) => {
  const { items } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = items
    .filter((item) => {
      if (!selectedCategory) return true;
      return item.categoryId === selectedCategory;
    })
    .filter((item) =>
      item?.itemName?.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {filteredItems.map((item, index) => (
          <div key={index} className="md:w-1/3 sm:w-1/2">
            <Item
              itemId={item.itemId}
              itemName={item.itemName}
              itemImageUrl={item.itemImageUrl}
              itemPrice={item.itemPrice}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemsDisplay;
