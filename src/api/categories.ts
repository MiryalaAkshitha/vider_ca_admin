import { http } from "api/http";

const getCategories = () => http.get("/categories");

const createCategory = (data: any) => http.post("/categories", data);

export { getCategories, createCategory };
