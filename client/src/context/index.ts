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
  addToCart: (item: ItemResponse) => void;
  cartItems: ItemResponse[];
  removeFromCart: (itemId: string) => void;
  updateItemCount: (itemId: string, count: number) => void;
  clearCart: () => void;
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
  addToCart: () => {},
  cartItems: [],
  removeFromCart: () => {},
  updateItemCount: () => {}, 
  clearCart: () => {}
};

export const AppContext = createContext<AppContextType>(defaultValue);
