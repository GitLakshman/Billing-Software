import apiClient from "./apiClient";

export interface ItemRequest {
  itemName: string;
  itemPrice: string;
  categoryId: string;
  itemDescription: string;
}

export interface ItemResponse {
  itemId?: string;
  itemName?: string;
  itemPrice?: string;
  itemsCount?: number;
  categoryId?: string;
  categoryName?: string;
  itemImageUrl?: string;
  itemDescription?: string;
  itemCreatedAt?: string;
  itemUpdatedAt?: string;
}

export const addItem = async (item: FormData) => {
  return await apiClient.post<ItemResponse>("/admin/items", item);
};

export const deleteItem = async (itemId: string) => {
  return await apiClient.delete<string>(`/admin/items/${itemId}`);
};

export const getItems = async () => {
  return await apiClient.get<ItemResponse[]>("/items");
};
