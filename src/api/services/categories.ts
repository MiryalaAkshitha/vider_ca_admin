import { http } from "api/http";

const getCategories = () => {
  return http.get("/categories");
};

const createCategory = (data: any) => {
  return http.post("/categories", data);
};

const deleteCategory = (id: any) => {
  return http.delete(`/categories/${id}`);
};

const updateCategory = ({ id, data }: { id: number; data: any }) => {
  return http.put(`/categories/${id}`, data);
};

export { getCategories, createCategory, updateCategory, deleteCategory };
