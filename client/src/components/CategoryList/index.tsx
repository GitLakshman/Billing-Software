import { useContext, useState } from "react";
import { AppContext } from "../../context";
import { Trash2Icon } from "lucide-react";
import { deleteCategory } from "../../service/CategoryService";
import { toast } from "react-toastify";
const CategoryList = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filterCategories = categories.filter(
    (category) =>
      category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) ??
      "",
  );

  const deleteByCategoryId = async (id: string) => {
    try {
      const res = await deleteCategory(id);
      if (res.status === 204) {
        const updatedCategories = categories.filter(
          (category) => category.categoryId !== id,
        );
        setCategories(updatedCategories);
        //display success toast message
        toast.success("Deleted Category Successfully");
      } else {
        //display error toast message
        toast.error("Unable to Delete Category!");
      }
    } catch (error) {
      console.log(error);
      //display error toast message
      toast.error("Category Not found in the List!");
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
        {filterCategories.map((category, index) => (
          <div key={index} className="w-full">
            <div
              key={index}
              className="p-2 rounded-md"
              style={{ background: category.categoryBgColor }}
            >
              <div className="flex items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={category.categoryImageUrl}
                    alt={category.categoryName}
                    className="w-15 h-15 border-2 p-1 bg-gray-200 border-white rounded-lg"
                  />
                </div>
                <div className="flex flex-col mr-auto">
                  <h5 className="mb-1 text-white">{category.categoryName}</h5>
                  <p className="text-white">{category.itemsCount} Items</p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-red-500 text-white p-1 rounded-sm hover:opacity-95 transition-colors duration-200"
                    onClick={() =>
                      deleteByCategoryId(category.categoryId ?? "")
                    }
                  >
                    <Trash2Icon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
