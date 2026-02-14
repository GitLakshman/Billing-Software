import { useEffect, useState, type ReactNode } from "react";
import {
  getCategories,
  type CategoryResponse,
} from "../service/CategoryService";
import { AppContext, type AppContextType } from ".";
import { getItems, type ItemResponse } from "../service/ItemService";

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [auth, setAuth] = useState({
    token: null as string | null,
    userRole: null as string | null,
  });
  const [cartItems, setCartItems] = useState<ItemResponse[]>([]);

  const addToCart = (item: ItemResponse) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.itemName === item.itemName,
    );
    if (existingCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.itemName === item.itemName
            ? { ...cartItem, itemsCount: (cartItem.itemsCount || 0) + 1 }
            : cartItem,
        ),
      );
    } else {
      setCartItems([...cartItems, { ...item, itemsCount: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.itemId !== itemId));
  };

  const updateItemCount = (itemId: string, count: number) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.itemId === itemId
          ? { ...cartItem, itemsCount: count }
          : cartItem,
      ),
    );
  };

  const setAuthData = (token: string, role: string) => {
    setAuth({ token: token, userRole: role });
  };

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    async function loadCategoriesItems() {
      if (token && userRole) {
        setAuthData(token, userRole);
      }

      try {
        const categorysResponse = await getCategories();
        const itemsResponse = await getItems();

        setCategories(categorysResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error("Failed to load categories or items:", error);
      }
    }
    if (token) {
      loadCategoriesItems();
    }
  }, [token, userRole]);

  const contextValue: AppContextType = {
    categories,
    setCategories,
    items,
    setItems,
    auth,
    setAuthData,
    addToCart,
    cartItems,
    removeFromCart,
    updateItemCount,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
