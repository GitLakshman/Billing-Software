import type { CategoryResponse } from "../../service/CategoryService";

const Category = ({
  categoryName,
  categoryImageUrl,
  categoryBgColor,
  itemsCount,
  isSelected,
  onClick,
}: CategoryResponse & {
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex items-center relative gap-2 p-2 rounded-md cursor-pointer shadow-sm w-48 shrink-0 hover:scale-105 transition-all duration-200"
      style={{ backgroundColor: categoryBgColor }}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="bg-white p-1 rounded-md flex items-center justify-center shrink-0 w-12 h-12">
        <img
          src={categoryImageUrl}
          alt={categoryName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Text Section */}
      <div className="text-white flex flex-col justify-center">
        <h6 className="text-sm font-semibold leading-tight">{categoryName}</h6>
        <p className="text-xs font-medium mt-0.5 opacity-95">
          {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
        </p>
      </div>
      {isSelected && (
        <div className="absolute right-2 top-2 w-2 h-2 bg-white rounded-full"></div>
      )}
    </div>
  );
};

export default Category;
