import { Box, Grid, Typography } from "@mui/material";
import { resetPassword } from "api/services/users";
import { newlogo, signup } from "assets";
import { atom_logo } from "assets";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import PasswordField from "views/login/PasswordField";
import { BackgroundImage, LogoContainer } from "views/login/styles";

type StateType = { password: string; confirmPassword: string };

const ResetPassword = () => {
  const { queryParams } = useQueryParams();
  const navigate = useNavigate();
  const [state, setState] = useState<StateType>({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation(resetPassword, {
    onSuccess: () => {
      snack.success("Password reset successfully");
      navigate("/login");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      return snack.error("Passwords do not match");
    }

    mutate({
      token: queryParams.token,
      password: state.password,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} lg={6}>
        <BackgroundImage>
          <LogoContainer>
            <img src={atom_logo} alt="" />
            <Box mt={6}>
              <img src={signup} alt="" />
            </Box>
            <Typography mt={2} variant="subtitle2" color="white">
              Vider Practice Management software
            </Typography>
            <Typography mt={1} variant="body2" color="rgba(255,255,255,0.7)">
               Vider is a technology-driven smart discovery,that offers services addressing the growing needs of
              Professionals (CA/CMA/CS) & Clients in enhancing businesses in India.
            </Typography>
          </LogoContainer>
        </BackgroundImage>
      </Grid>
      <Grid xs={6} lg={6} item>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          minHeight="100vh"
        >
          <Box maxWidth="400px" width="100%">
            <Typography variant="subtitle1">Reset your password</Typography>
            <form onSubmit={handleSubmit}>
              <PasswordField
                value={state.password}
                label="Password"
                name="password"
                sx={{ mt: 3 }}
                inputProps={{
                  minLength: 8,
                  pattern:
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}).*$",
                  title:
                    "Password must be at least 8 characters long and contain at least one special character, one uppercase letter, one lowercase letter and one number",
                }}
                onChange={handleChange}
              />
              <PasswordField
                value={state.confirmPassword}
                name="confirmPassword"
                label="Confirm Password"
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <LoadingButton
                loading={isLoading}
                sx={{ mt: 3 }}
                fullWidth
                type="submit"
                title="Submit"
                color="secondary"
              />
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
