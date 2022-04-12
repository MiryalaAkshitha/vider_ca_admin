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

const getForm = ({ queryKey }: any) => {
  return http.get(`/forms/${queryKey[1]}`);
};

const addPage = ({ formId, name }: any) => {
  return http.post(`/forms/${formId}/pages`, { name });
};

const updatePage = ({ formId, pageId, data }: any) => {
  return http.patch(`/forms/${formId}/pages/${pageId}`, data);
};

const deleteField = ({ formId, pageId, fieldId }: any) => {
  return http.delete(`/forms/${formId}/pages/${pageId}/fields/${fieldId}`);
};

export {
  getForms,
  createForm,
  updateForm,
  deleteForm,
  getForm,
  addPage,
  updatePage,
  deleteField,
};
