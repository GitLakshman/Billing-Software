import { assets } from "../../../assets/assets";
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
    <>
      <div className="flex flex-wrap gap-3 p-3">
        <Category
          categoryName="All Categories"
          categoryImageUrl={assets.logo}
          itemsCount={categories.reduce((acc, cat) => acc + cat.itemsCount!, 0)}
          categoryBgColor="#6c757d"
          isSelected={selectedCategory === ""}
          onClick={() => setSelectedCategory("")}
        />
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
    </>
  );
};

export default CategoryDisplay;
