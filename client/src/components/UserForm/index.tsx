import { useState } from "react";
import { registerUser, type UserResponse } from "../../service/UserService";
import { toast } from "react-toastify";

const UserForm = ({
  setUsers,
}: {
  setUsers: React.Dispatch<React.SetStateAction<UserResponse[]>>;
}) => {
  const [data, setData] = useState({
    userEmail: "",
    userName: "",
    userPassword: "",
    userRole: "ROLE_USER",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await registerUser(data);

      setUsers((prev) => [...prev, response.data]);

      toast.success("User Registered");

      setData({
        userEmail: "",
        userName: "",
        userPassword: "",
        userRole: "ROLE_USER",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2 p-4 md:max-w-5/6 bg-white rounded-md text-black">
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userName">Name</label>
          <input
            type="name"
            name="userName"
            id="userName"
            placeholder="Jhon Doe"
            className="border border-gray-400 rounded-sm px-2 py-1"
            onChange={onChangeHandler}
            value={data.userName}
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userMail">Email</label>
          <input
            type="email"
            name="userEmail"
            id="userMail"
            placeholder="jhondoe@example.com"
            className="border border-gray-400 rounded-sm px-2 py-1"
            onChange={onChangeHandler}
            value={data.userEmail}
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="********"
            className="border border-gray-400 rounded-sm px-2 py-1"
            onChange={onChangeHandler}
            value={data.userPassword}
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="flex items-center justify-center bg-yellow-400 px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
