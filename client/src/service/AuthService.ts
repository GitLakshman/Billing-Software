import axios from "axios";
import type { AuthRequest } from "../pages/Login";

export interface AuthResponse {
  token: string;
  userEmail: string;
  userRole: string;
}

export const login = async (credentials: AuthRequest) => {
  return await axios.post("http://localhost:8080/api/v1.0/login", credentials);
};
