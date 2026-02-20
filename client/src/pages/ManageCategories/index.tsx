import CategoryForm from "../../components/CategoryForm";
import CategoryList from "../../components/CategoryList";

const ManageCategories = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5 text-white bg-[#2C3335] min-h-[calc(100vh-5rem)] box-border">
      <div className="flex flex-col w-full lg:flex-8/12 p-4 border border-white/20 rounded-lg box-border">
        <CategoryForm />
      </div>
      <div className="flex flex-col w-full lg:flex-4/12 p-4 border border-white/20 rounded-lg box-border">
        <CategoryList />
      </div>
    </div>
  );
};

export default ManageCategories;
