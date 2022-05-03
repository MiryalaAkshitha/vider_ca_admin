import { http } from "api/http";

const createForm = (data: any) => {
  return http.post("/forms", data);
};

const updateForm = ({ data, id }: any) => {
  return http.put(`/forms/${id}`, data);
};

const deleteForm = ({ id }: any) => {
  return http.delete(`/forms/${id}`);
};

const cloneForm = ({ id, data }: any) => {
  return http.post(`/forms/${id}/clone`, data);
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

const deletePage = ({ formId, pageId }: any) => {
  return http.delete(`/forms/${formId}/pages/${pageId}`);
};

const updatePage = ({ formId, pageId, data }: any) => {
  return http.patch(`/forms/${formId}/pages/${pageId}`, data);
};

const deleteField = ({ formId, pageId, fieldId }: any) => {
  return http.delete(`/forms/${formId}/pages/${pageId}/fields/${fieldId}`);
};

const addField = ({ formId, pageId, data }: any) => {
  return http.post(`/forms/${formId}/pages/${pageId}/fields`, data);
};

const updateField = ({ formId, pageId, fieldId, data }: any) => {
  return http.patch(`/forms/${formId}/pages/${pageId}/fields/${fieldId}`, data);
};

const getFormValidations = () => {
  return http.get("/form-validations");
};

const createFormValidation = ({ data }) => {
  return http.post("/form-validations", data);
};

const updateFormValidation = ({ id, data }) => {
  return http.put(`/form-validations/${id}`, data);
};

const deleteFormValidation = ({ id }) => {
  return http.delete(`/form-validations/${id}`);
};

const getFormActivity = ({ queryKey }: any) => {
  return http.get(`/forms/${queryKey[1]}/activity`);
};

const signField = ({ formId, fieldId, data }: any) => {
  return http.post(`/forms/${formId}/fields/${fieldId}/esign`, data);
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
  addField,
  updateField,
  getFormValidations,
  createFormValidation,
  deleteFormValidation,
  updateFormValidation,
  cloneForm,
  deletePage,
  getFormActivity,
  signField,
};
