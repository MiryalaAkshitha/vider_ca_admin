import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { signin } from "api/users";
import { whiteLogo } from "assets";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import ForgotPassword from "views/login/ForgotPassword";
import PasswordField from "views/login/PasswordField";
import { BackgroundImage, LogoContainer } from "views/login/styles";

type DataType = { username: string; password: string };

const Login = () => {
  const router = useHistory();
  const snack = useSnack();
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
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
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
            <img src={whiteLogo} alt="" />
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
                onChange={handleChange}
              />
              <PasswordField
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
              <Button sx={{ mt: 1 }} onClick={() => router.push("/signup")}>
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
