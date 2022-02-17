import { http } from "api/http";

const getActivity = ({ queryKey }) => {
  return http.get("/activity", { params: { ...queryKey[1] } });
};

export { getActivity };
