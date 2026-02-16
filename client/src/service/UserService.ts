import apiClient from "./apiClient";

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
  return await apiClient.post<UserResponse>("/admin/register", userData);
};

export const deleteUser = async (userId: string) => {
  return await apiClient.delete<{ id: string }>(`/admin/users/${userId}`);
};

export const getUsers = async () => {
  return await apiClient.get<UserResponse[]>("/admin/users");
};
