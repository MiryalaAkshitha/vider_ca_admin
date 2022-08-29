import { http } from "api/http";
import axios from "axios";

const getSandboxToken = () => {
  return axios({
    url: process.env.REACT_APP_SANDBOX_AUTH_URL || "",
    method: "POST",
    headers: {
      Accept: "application/json",
      "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY || "",
      "x-api-secret": process.env.REACT_APP_SANDBOX_API_SECRET || "",
      "x-api-version": "1.0",
    },
  });
};

const getGstDetails = ({ token, gstNumber }) => {
  return axios.get(`${process.env.REACT_APP_SANDBOX_GST_API}/${gstNumber}`, {
    headers: {
      Authorization: token,
      "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY || "",
    },
  });
};

const getPanDetails = ({ token, panNumber }) => {
  return axios.get(`${process.env.REACT_APP_SANDBOX_PAN_API}/${panNumber}`, {
    headers: {
      Authorization: token,
      "x-api-key": process.env.REACT_APP_SANDBOX_API_KEY || "",
    },
    params: {
      consent: "y",
      reason: "For KYC of User",
    },
  });
};

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

const forgotPassword = (data: any) => {
  return http.post("/users/forgot-password", data);
};

const resetPassword = (data: any) => {
  return http.post("/users/reset-password", data);
};

const inviteUser = (data: any) => {
  return http.post("/users/invite-user", data);
};

const joinUser = (data: any) => {
  return http.post("/users/join", data);
};

const getUsers = () => {
  return http.get("/users");
};

const getAllUsers = () => {
  return http.get("/users/all");
};

const getInvitedusers = (data: any) => {
  return http.get("/users/invited", data);
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

const getProfile = () => {
  return http.get("/users/profile");
};

const getUserProfile = ({ queryKey }) => {
  return http.get(`/users/profile/${queryKey[1]}`);
};

const updateProfile = (data: any) => {
  return http.patch(`/users/profile`, data);
};

const updateUserProfile = ({ id, data }: any) => {
  return http.patch(`/users/profile/${id}`, data);
};

const changePassword = (data: any) => {
  return http.patch(`/users/change-password`, data);
};

const deleteUser = (id: number) => {
  return http.post(`/users/${id}/delete`);
};

const activateDeactivateUser = ({ id, data }) => {
  return http.post(`/users/${id}/activate-deactivate`, data);
};

const getDeletedUsers = () => {
  return http.get("/users/deleted");
};

const restoreUser = (id: number) => {
  return http.post(`/users/${id}/restore`);
};

export {
  getSandboxToken,
  getGstDetails,
  getPanDetails,
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
  forgotPassword,
  resetPassword,
  changePassword,
  getInvitedusers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  activateDeactivateUser,
  getAllUsers,
  getDeletedUsers,
  restoreUser,
};
