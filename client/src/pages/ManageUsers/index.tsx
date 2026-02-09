import UserList from "../../components/UserList";
import UserForm from "../../components/UserForm";
import { useEffect, useState } from "react";
import { getUsers, type UserResponse } from "../../service/UserService";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [user, setUser] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await getUsers();
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex gap-5 p-5 text-white bg-[#2C3335] h-[calc(100vh-5rem)] box-border">
      <div className="left-form-box">
        <UserForm setUsers={setUser} />
      </div>
      <div className="right-list-box">
        <UserList users={user} setUsers={setUser} />
      </div>
    </div>
  );
};

export default ManageUsers;
