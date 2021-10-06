import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { http } from "api/http";
import { whiteLogo } from "assets";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import ForgotPassword from "views/login/ForgotPassword";
import PasswordField from "views/login/PasswordField";
import { BackgroundImage, LogoContainer } from "views/login/styles";

type DataType = { username: string; password: string };

const Login = () => {
  const snack = useSnack();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType>({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res: any = await http.post("/auth/login", data);
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    } catch (err: any) {
      snack.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container>
      <Grid item xs={6} lg={6}>
        <BackgroundImage>
          <LogoContainer>
            <img src={whiteLogo} alt='' />
          </LogoContainer>
        </BackgroundImage>
      </Grid>
      <Grid xs={6} lg={6} item>
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          minHeight='100vh'>
          <Box maxWidth='400px' width='100%'>
            <Typography variant='subtitle1'>Sign in to your Account</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                size='small'
                name='username'
                label='Username'
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <PasswordField
                label='Password'
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <LoadingButton
                loading={loading}
                sx={{ mt: 4 }}
                size='large'
                fullWidth
                type='submit'
                title='Submit'
                color='secondary'
              />
            </form>
            <Button sx={{ mt: 3 }} onClick={() => setOpen(true)}>
              Forgot Password?
            </Button>
          </Box>
        </Box>
      </Grid>
      <ForgotPassword open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Login;
