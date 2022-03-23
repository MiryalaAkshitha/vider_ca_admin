import { http } from "api/http";

const getActivity = ({ queryKey }) => {
  return http.get("/activity", { params: { ...queryKey[1] } });
};

const getStates = () => {
  return http.get("/common/states");
};

export { getActivity, getStates };
