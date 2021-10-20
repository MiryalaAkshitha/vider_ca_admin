import { http } from "api/http";

const getForms = ({ queryKey }) => {
  return http.get("/forms", { params: { ...queryKey[1] } });
};
const createForm = (data: any) => http.post("/forms", data);
const updateForm = ({ data, id }: any) => http.put(`/forms/${id}`, data);
const deleteForm = (id: any) => http.delete(`/forms/${id}`);
const createField = (data: any) => http.post(`/forms/fields`, data);
const getFields = () => http.get("/forms/fields");
const deleteField = (id: any) => http.delete(`/forms/fields/${id}`);
const saveFormFields = (data: any) => http.post("/forms/form-fields", data);

export {
  getForms,
  createForm,
  updateForm,
  deleteForm,
  createField,
  getFields,
  deleteField,
  saveFormFields,
};
