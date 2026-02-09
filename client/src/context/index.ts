import { createContext } from "react";
import type { CategoryResponse } from "../service/CategoryService";
import type { ItemResponse } from "../service/ItemService";

export interface AppContextType {
  categories: CategoryResponse[];
  setCategories: (categories: CategoryResponse[]) => void;
  items: ItemResponse[];
  setItems: (items: ItemResponse[]) => void;
  auth: {
    token: string | null;
    userRole: string | null;
  };
  setAuthData: (token: string, role: string) => void;
}

const defaultValue: AppContextType = {
  categories: [],
  setCategories: () => {},
  items: [],
  setItems: () => {},
  auth: {
    token: null,
    userRole: null,
  },
  setAuthData: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
