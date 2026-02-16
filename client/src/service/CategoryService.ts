import apiClient from "./apiClient";

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
  await apiClient.post<CategoryResponse>("/admin/categories", category);

export const getCategories = async () =>
  await apiClient.get<CategoryResponse[]>("/categories");

export const deleteCategory = async (categoryId: string) =>
  await apiClient.delete<{ id: string }>(`/admin/categories/${categoryId}`);
