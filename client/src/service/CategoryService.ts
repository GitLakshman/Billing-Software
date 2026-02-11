import axios from "axios";

export interface CategoryRequest {
  categoryName: string;
  categoryDescription: string;
  categoryBgColor: string;
}

export interface CategoryResponse {
  categoryId?: string;
  categoryName?: string;
  categoryDescription?: string;
  categoryBgColor?: string;
  categoryImageUrl?: string;
  categoryCreatedAt?: string;
  categoryUpdatedAt?: string;
  itemsCount?: number;
}

export const addCategory = async (category: FormData) =>
  await axios.post<CategoryResponse>(
    "http://localhost:8080/api/v1.0/admin/categories",
    category,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );

export const getCategories = async () =>
  await axios.get<CategoryResponse[]>(
    "http://localhost:8080/api/v1.0/categories",
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );

export const deleteCategory = async (categoryId: string) =>
  await axios.delete<{ id: string }>(
    `http://localhost:8080/api/v1.0/admin/categories/${categoryId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
  );
