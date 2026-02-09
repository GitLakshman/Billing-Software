import axios from "axios";

export interface UserRequest {
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: string;
}

export interface UserResponse {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  userCreatedAt: string;
  userUpdatedAt: string;
}

export const registerUser = async (userData: UserRequest) => {
  return await axios.post<UserResponse>(
    "http://localhost:8080/api/v1.0/admin/register",
    userData,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const deleteUser = async (userId: string) => {
  return await axios.delete<{ id: string }>(
    `http://localhost:8080/api/v1.0/admin/users/${userId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const getUsers = async () => {
  return await axios.get<UserResponse[]>(
    "http://localhost:8080/api/v1.0/admin/users",
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};
