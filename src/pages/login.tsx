import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { signin } from "api/services/users";
import { newlogo, signup } from "assets";
import { atom_logo } from "assets";
import LoadingButton from "components/LoadingButton";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ForgotPassword from "views/login/ForgotPassword";
import PasswordField from "views/login/PasswordField";
import { BackgroundImage, LogoContainer } from "views/login/styles";

type DataType = { username: string; password: string };

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<DataType>({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation(signin, {
    onSuccess: (res: any) => {
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("userId", JSON.stringify(res.data.userId));
      window.location.href = "/";
    },
    onError: (err: any) => {
      if (err.response.data.statusCode === 401) {
        toast.error("Invalid Credentials");
      } else {
        toast.error(err.response.data.message);
      }
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    mutate(state);
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
            {/* <Typography mt={2} variant="subtitle2" color="white">
              Vider Practice Management software
            </Typography> */}
            <Typography mt={1} variant="body2" color="rgba(255,255,255,0.7)">
              Vider is a technology-driven smart discovery,that offers services addressing the
              growing needs of Professionals (CA/CMA/CS) & Clients in enhancing businesses in India.
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
            <Typography variant="subtitle1">Sign in to your Account</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                size="small"
                name="username"
                label="Email"
                sx={{ mt: 3 }}
                type="email"
                onChange={handleChange}
              />
              <PasswordField
                value={state.password}
                label="Password"
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <LoadingButton
                loading={isLoading}
                sx={{ mt: 4 }}
                size="large"
                fullWidth
                type="submit"
                title="Submit"
                color="secondary"
              />
            </form>
            <div>
              <Button sx={{ mt: 3 }} onClick={() => setOpen(true)}>
                Forgot Password?
              </Button>
            </div>
            <div>
              <Button sx={{ mt: 1 }} onClick={() => navigate("/signup")}>
                Don't have an account - Create New Account
              </Button>
            </div>
          </Box>
        </Box>
      </Grid>
      <ForgotPassword open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Login;
