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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-[#2C3335] text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5 p-5 text-white bg-[#2C3335] min-h-[calc(100vh-5rem)] box-border">
      <div className="flex flex-col w-full lg:flex-8/12 p-4 border border-white/20 rounded-lg box-border">
        <UserForm setUsers={setUser} />
      </div>
      <div className="flex flex-col w-full lg:flex-4/12 p-4 border border-white/20 rounded-lg box-border">
        <UserList users={user} setUsers={setUser} />
      </div>
    </div>
  );
};

export default ManageUsers;
