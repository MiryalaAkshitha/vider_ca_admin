import { http } from "api/http";

const getCategories = () => http.get("/categories");

const createCategory = (data: any) => http.post("/categories", data);

const deleteCategory = (id: any) => http.delete(`/categories/${id}`);

const updateCategory = ({ id, data }: { id: number; data: any }) =>
  http.put(`/categories/${id}`, data);

export { getCategories, createCategory, updateCategory, deleteCategory };
