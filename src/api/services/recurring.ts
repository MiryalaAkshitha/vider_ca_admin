import { http } from "api/http";

const getRecurringProfiles = ({ queryKey }) => {
  return http.get("/recurring-profile", { params: { clientId: queryKey[1] } });
};

export { getRecurringProfiles };
