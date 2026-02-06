import ItemForm from "../../components/ItemForm";
import ItemList from "../../components/ItemList";

const ManageItems = () => {
  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      <div className="left-form-box">
        <ItemForm />
      </div>
      <div className="right-list-box">
        <ItemList />
      </div>
    </div>
  );
};

export default ManageItems;
