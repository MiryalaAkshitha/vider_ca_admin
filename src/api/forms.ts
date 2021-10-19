import { http } from "api/http";

const getForms = ({ queryKey }) => {
  return http.get("/forms", { params: { ...queryKey[1] } });
};
const createForm = (data: any) => http.post("/forms", data);
const updateForm = ({ data, id }: any) => http.put(`/forms/${id}`, data);
const deleteForm = (id: any) => http.delete(`/forms/${id}`);

export { getForms, createForm, updateForm, deleteForm };
