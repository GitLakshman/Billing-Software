import type { CategoryResponse } from "../../../service/CategoryService";
import Category from "../../Category";

const CategoryDisplay = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: CategoryResponse[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-3 p-3">
      {categories.map((category) => (
        <Category
          key={category.categoryId}
          categoryName={category.categoryName}
          categoryImageUrl={category.categoryImageUrl}
          itemsCount={category.itemsCount}
          categoryBgColor={category.categoryBgColor}
          isSelected={selectedCategory === category.categoryId}
          onClick={() => setSelectedCategory(category.categoryId ?? "")}
        />
      ))}
    </div>
  );
};

export default CategoryDisplay;
