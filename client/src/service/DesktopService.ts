import apiClient from "./apiClient"

export const getDesktopData = async () =>{
    return await apiClient.get("/dashboard");
}