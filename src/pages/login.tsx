import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { whiteLogo } from 'assets';
import React, { useState } from 'react';
import ForgotPassword from 'views/login/ForgotPassword';
import PasswordField from 'views/login/PasswordField';
import { BackgroundImage, LogoContainer } from 'views/login/styles';

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
          textAlign="center"
          minHeight='100vh'>
          <Box maxWidth='400px' width='100%'>
            <Typography variant='subtitle1'>Sign in to your Account</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                size="small"
                name='username'
                label='Username'
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <PasswordField
                label="Password"
                sx={{ mt: 3 }}
                onChange={handleChange}
              />
              <Button
                sx={{ mt: 4 }}
                size="large"
                fullWidth
                type='submit'
                variant='contained'
                color='secondary'>
                {btnLoader ? <CircularProgress color='secondary' /> : 'Login'}
              </Button>
            </form>
            <Button
              sx={{ mt: 3 }}
              onClick={() => setOpen(true)}>
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
