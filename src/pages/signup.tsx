import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { signup } from "api/users";
import { whiteLogo } from "assets";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import PasswordField from "views/login/PasswordField";
import { BackgroundImage, LogoContainer } from "views/login/styles";

type State = {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  mobile: string;
  companySize: number;
  companyAddress: string;
  password: string;
};

const SignUp = () => {
  const router = useHistory();
  const snack = useSnack();
  const [state, setState] = useState<State>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    companyAddress: "",
    mobile: "",
    companySize: 0,
    password: "",
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: () => {
      router.push("/login");
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
          minHeight="100vh"
        >
          <Box maxWidth="600px" width="100%">
            <Typography sx={{ mb: 2, textAlign: "center" }} variant="subtitle1">
              Create a new account
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="mobile"
                    label="Mobile Number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="companyName"
                    label="Company Name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="email"
                    label="Company Email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="companySize"
                    label="Team Size"
                    type="number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    size="small"
                    name="companyAddress"
                    label="State"
                    onChange={handleChange}
                    select
                  >
                    <MenuItem value="Telangana">Telangana</MenuItem>
                    <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
                    <MenuItem value="Tamilanadu">Tamilanadu</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <PasswordField label="Password" onChange={handleChange} />
                </Grid>
              </Grid>
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
            <Box textAlign="center">
              <Button sx={{ mt: 2 }} onClick={() => router.push("/login")}>
                Already have an account - Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
