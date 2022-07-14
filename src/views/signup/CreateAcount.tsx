import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { sendOtp } from "api/services/users";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleFieldChange,
  handleStep,
  handleToken,
  selectSignup,
} from "redux/reducers/signUpSlice";
import PasswordField from "views/login/PasswordField";
import BackgroundWrapper from "./BackgroundWrapper";

function CreateAccount() {
  const { fullName, email, password, mobileNumber } = useSelector(selectSignup);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(sendOtp, {
    onSuccess: (res) => {
      dispatch(handleToken(res?.data?.token ?? ""));
      dispatch(handleStep("otp"));
      snack.success("OTP sent successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      handleFieldChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    mutate({ mobileNumber, email });
  };

  return (
    <BackgroundWrapper>
      <Typography sx={{ mb: 2, textAlign: "center" }} variant="subtitle1">
        Create a new account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              name="fullName"
              label="Full Name"
              type="text"
              inputProps={{
                minLength: 3,
              }}
              onChange={handleChange}
              value={fullName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              name="mobileNumber"
              inputProps={{
                pattern: "[0-9]{10}",
                title: "Mobile number must be 10 digits",
              }}
              label="Mobile Number"
              onChange={handleChange}
              value={mobileNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              size="small"
              name="email"
              label="Email"
              type="email"
              onChange={handleChange}
              value={email}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordField
              required
              value={password}
              label="Password"
              onChange={handleChange}
              inputProps={{
                minLength: 8,
                pattern:
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}).*$",
                title:
                  "Password must be at least 8 characters long and contain at least one special character, one uppercase letter, one lowercase letter and one number",
              }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={isLoading}
          sx={{ mt: 4 }}
          size="large"
          fullWidth
          type="submit"
          title="Submit and generate OTP"
          color="secondary"
        />
      </form>
      <Box textAlign="center">
        <Button sx={{ mt: 2 }} onClick={() => navigate("/login")}>
          Already have an account - Sign in
        </Button>
      </Box>
    </BackgroundWrapper>
  );
}

export default CreateAccount;
