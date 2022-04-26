import { http } from "api/http";

const getRecurringProfiles = ({ queryKey }: any) => {
  return http.get("/recurring-profile", { params: { clientId: queryKey[1] } });
};

const updateRecurringProfile = ({ id, data }: any) => {
  return http.patch(`/recurring-profile/${id}`, data);
};

const terminateRecurringProfile = ({ id }: any) => {
  return http.post(`/recurring-profile/${id}/terminate`);
};

export {
  getRecurringProfiles,
  updateRecurringProfile,
  terminateRecurringProfile,
};
