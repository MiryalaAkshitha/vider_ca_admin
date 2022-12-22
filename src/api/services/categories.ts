import { http } from "api/http";

const getCategories = () => {
  return http.get("/categories");
};

const getDefaultCategories = () => {
  return http.get("/categories/default");
};

const createCategory = (data: any) => {
  return http.post("/categories", data);
};

const importCategories = (data: any) => {
  return http.post("/categories/import", data);
};

const deleteCategory = (id: any) => {
  return http.delete(`/categories/${id}`);
};

const updateCategory = ({ id, data }: { id: number; data: any }) => {
  return http.put(`/categories/${id}`, data);
};

const updateAdminCategories = () => {
  return http.post(`/categories/update-admin-categories`);
};

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getDefaultCategories,
  importCategories,
  updateAdminCategories,
};
