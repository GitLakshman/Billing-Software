import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteUser, type UserResponse } from "../../service/UserService";
import { toast } from "react-toastify";

const UserList = ({
  users,
  setUsers,
}: {
  users: UserResponse[];
  setUsers: React.Dispatch<React.SetStateAction<UserResponse[]>>;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filterUsers = users.filter(
    (user: UserResponse) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.userRole !== "ROLE_ADMIN",
  );

  const deleteByUserId = async (id: string) => {
    try {
      const res = await deleteUser(id);
      if (res.status === 204) {
        const updatedUsers = users.filter((user) => user.userId !== id);
        setUsers(updatedUsers);
        toast.success("User Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete User!");
    }
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}>
      <div className="flex flex-col py-2 ">
        <div className="mb-3 px-2">
          <input
            type="text"
            id="keyword"
            placeholder="Search by keyword"
            className="block w-full p-2 bg-white text-black border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="flex flex-col p-2 gap-3">
        {filterUsers.map((user, index) => (
          <div key={index} className="w-full">
            <div className="p-2 rounded-md bg-black">
              <div className="flex items-center">
                <div className="grow">
                  <h5 className="mb-1 text-white">{user.userName}</h5>
                  <p className="text-white">{user.userEmail}</p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-red-500 text-white p-1 rounded-sm hover:opacity-95 transition-colors duration-200"
                    onClick={() => deleteByUserId(user.userId)}
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

export default UserList;
