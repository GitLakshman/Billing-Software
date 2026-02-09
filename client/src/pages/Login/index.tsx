import {
  useContext,
  useState,
  type ChangeEvent,
  type FormEvent,
  type FC,
} from "react";
import { toast } from "react-toastify";
import { login } from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";

export interface AuthRequest {
  userEmail: string;
  userPassword: string;
}

const Login: FC = () => {
  const { setAuthData } = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AuthRequest>({
    userEmail: "",
    userPassword: "",
  });

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(data);

      if (res.status === 200) {
        toast.success("Login Successful");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.userRole);

        setAuthData(res.data.token, res.data.userRole);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Email/Password is Invalid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('./assets/login-bg.jpg')] bg-cover backdrop-blur-sm bg-center bg-no-repeat flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-100">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <p className="text-center">Login to access your account</p>

        <div className="p-2 max-w-full bg-white rounded-md text-black">
          <form onSubmit={onSubmitHandler}>
            <div className="flex flex-col gap-1 mb-4">
              <label htmlFor="userEmail">Email Address</label>
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                placeholder="Jhonedoe@example.com"
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
                disabled={loading}
                className="flex items-center justify-center bg-gray-800 text-white px-2 py-1 w-full rounded-sm hover:opacity-95 transition-colors duration-200"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
