import { http } from "api/http";

const signup = (data: any) => {
  return http.post("/users/signup", data);
};

const sendOtp = (data: any) => {
  return http.post("/users/otp", data);
};

const verifyOtp = (data: any) => {
  return http.post("/users/otp-verify", data);
};

const signin = (data: any) => {
  return http.post("/users/signin", data);
};

const inviteUser = (data: any) => {
  return http.post("/users/invite-user", data);
};

const joinUser = (data: any) => {
  return http.post("/users/join", data);
};

const getUsers = (data: any) => {
  return http.get("/users", data);
};

const getTeams = () => {
  return http.get("/teams");
};

const getTeam = ({ queryKey }) => {
  return http.get(`/teams/${queryKey[1]}`);
};

const createTeam = (data: any) => {
  return http.post("/teams", data);
};

const removeFromTeam = ({ teamId, userId }) => {
  return http.post(`/teams/${teamId}/remove-member`, { userId });
};

const updateTeam = ({ id, data }) => {
  return http.put(`/teams/${id}`, data);
};

const deleteTeam = ({ id }) => {
  return http.delete(`/teams/${id}`);
};

const getProfile = ({ queryKey }) => {
  return http.get("/users/profile", { params: { userId: queryKey[1] } });
};

const updateProfile = (data: any) => {
  return http.patch(`/users/profile`, data);
};

export {
  signup,
  signin,
  inviteUser,
  getUsers,
  sendOtp,
  verifyOtp,
  joinUser,
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeam,
  removeFromTeam,
  getProfile,
  updateProfile,
};
