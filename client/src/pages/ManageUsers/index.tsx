import UserList from "../../components/UserList";
import UserForm from "../../components/UserForm";

const ManageUsers = () => {
  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      <div className="left-form-box">
        <UserForm />
      </div>
      <div className="right-list-box">
        <UserList />
      </div>
    </div>
  );
};

export default ManageUsers;
