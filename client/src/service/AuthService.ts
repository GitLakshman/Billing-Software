import apiClient from "./apiClient";
import type { AuthRequest } from "../pages/Login";

export interface AuthResponse {
  token: string;
  userEmail: string;
  userRole: string;
}

export const login = async (credentials: AuthRequest) => {
  return await apiClient.post("/login", credentials);
};
