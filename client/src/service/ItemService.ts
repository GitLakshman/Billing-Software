import axios from "axios";

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
  categoryId?: string;
  categoryName?: string;
  itemImageUrl?: string;
  itemDescription?: string;
  itemCreatedAt?: string;
  itemUpdatedAt?: string;
}

export const addItem = async (item: FormData) => {
  return await axios.post<ItemResponse>(
    "http://localhost:8080/api/v1.0/admin/items",
    item,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const deleteItem = async (itemId: string) => {
  return await axios.delete<string>(
    `http://localhost:8080/api/v1.0/admin/items/${itemId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
};

export const getItems = async () => {
  return await axios.get<ItemResponse[]>(
    "http://localhost:8080/api/v1.0/items",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  );
};
