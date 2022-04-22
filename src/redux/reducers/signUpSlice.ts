import { RootState } from "redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TeamMember = {
  fullName: string;
  email: string;
  mobileNumber: string;
  role: string;
};

export interface ISignup {
  step: "signup" | "otp" | "details" | "team";
  token: string;
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  firmType: string;
  firmName: string;
  firmStatus: string;
  gstNumber: string;
  state: string;
  city: string;
  pincode: string;
  teamMembers: Array<TeamMember>;
}

const initialState: ISignup = {
  step: "details",
  token: "",
  fullName: "",
  email: "",
  password: "",
  mobileNumber: "",
  firmType: "",
  firmName: "",
  firmStatus: "",
  gstNumber: "",
  state: "",
  city: "",
  pincode: "",
  teamMembers: [],
};

export const signupSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    handleStep(
      state,
      action: PayloadAction<"signup" | "otp" | "details" | "team">
    ) {
      state.step = action.payload;
    },
    handleFieldChange(
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) {
      state[action.payload.name] = action.payload.value;
    },
    handleToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    handleTeamMember(state, action: PayloadAction<TeamMember>) {
      state.teamMembers.push(action.payload);
    },
  },
});

export const selectSignup = (state: RootState) => state.signup;

export const { handleToken, handleStep, handleFieldChange, handleTeamMember } =
  signupSlice.actions;

export default signupSlice.reducer;
