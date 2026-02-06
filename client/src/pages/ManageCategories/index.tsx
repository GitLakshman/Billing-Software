import CategoryForm from "../../components/CategoryForm";
import CategoryList from "../../components/CategoryList";

const ManageCategories = () => {
  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      <div className="left-form-box">
        <CategoryForm />
      </div>
      <div className="right-list-box">
        <CategoryList />
      </div>
    </div>
  );
};

export default ManageCategories;
