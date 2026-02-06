import { createContext } from "react";
import type {
  CategoryResponse,
} from "../service/CategoryService";

export interface AppContextType {
  categories: CategoryResponse[];
  setCategories: (categories: CategoryResponse[]) => void;
}

const defaultValue: AppContextType = {
  categories: [],
  setCategories: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);
