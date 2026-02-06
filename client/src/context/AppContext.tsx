import { useEffect, useState, type ReactNode } from "react";
import {
  getCategories,
  type CategoryResponse,
} from "../service/CategoryService";
import { AppContext, type AppContextType } from ".";

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    }
    loadData();
  }, []);

  const contextValue: AppContextType = {
    categories,
    setCategories,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
