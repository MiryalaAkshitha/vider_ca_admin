import { http } from "api/http";

const createForm = (data: any) => {
  return http.post("/forms", data);
};

const updateForm = ({ data, id }: any) => {
  return http.put(`/forms/${id}`, data);
};

const deleteForm = (id: any) => {
  return http.delete(`/forms/${id}`);
};

const getForms = ({ queryKey }: any) => {
  return http.get("/forms", { params: { ...queryKey[1] } });
};

const createField = (data: any) => {
  return http.post(`/forms/fields`, data);
};

const getFields = () => {
  return http.get("/forms/fields");
};

const deleteField = (id: any) => {
  return http.delete(`/forms/fields/${id}`);
};

const updateField = ({ id, data }: any) => {
  return http.put(`/forms/fields/${id}`, data);
};

const saveFormFields = (data: any) => {
  return http.post("/forms/form-fields", data);
};

const getFormFields = ({ queryKey }: any) => {
  return http.get("/forms/form-fields", { params: { formId: queryKey[1] } });
};

export {
  getForms,
  createForm,
  updateForm,
  deleteForm,
  createField,
  getFields,
  deleteField,
  saveFormFields,
  getFormFields,
  updateField,
};
