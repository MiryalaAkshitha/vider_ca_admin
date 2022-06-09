import { Box, Button, TextField } from "@mui/material";
import { getPanDetails, getSandboxToken, signup } from "api/services/users";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { selectSignup } from "redux/reducers/signUpSlice";
import { SubmitType } from "types";

const PanDetails = () => {
  const [state, setState] = useState<any>({});
  const [isVerified, setIsVerified] = useState(false);
  const [isloading, setLoading] = useState<boolean>(false);
  const [panNumber, setPanNumber] = useState("");
  const { email, password, mobileNumber } = useSelector(selectSignup);

  const handleClick = async () => {
    if (!panNumber) return;

    setLoading(true);

    try {
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber,
        token: token?.data?.access_token,
      });

      const data: any = response?.data;

      setState({
        category: data?.data?.category,
        firstName: data?.data?.first_name,
        middleName: data?.data?.middle_name,
        lastName: data?.data?.last_name,
        fullName: data?.data?.full_name,
        tradeName: data?.data?.tradeName,
        constitutionOfBusiness: data?.data?.constitutionOfBusiness,
        buildingName: data?.data?.buildingName,
        street: data?.data?.street,
        city: data?.data?.city,
        state: data?.data?.state,
        pincode: data?.data?.pinCode,
      });
      setIsVerified(true);
    } catch (e: any) {
      if (e.response?.data?.code === 422) {
        snack.error("Invalid PAN");
      } else {
        snack.error(e.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: (res: any) => {
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e: SubmitType) => {
    e.preventDefault();
    mutate({
      ...state,
      email,
      password,
      mobileNumber,
      panNumber,
      category: state.category?.toUpperCase(),
    });
  };

  return (
    <>
      <Box>
        <TextField
          required
          onChange={(e) => setPanNumber(e.target.value)}
          value={panNumber}
          sx={{ mt: 2 }}
          label="Pan Number"
          name="panNumber"
          size="small"
          fullWidth
        />
        {!isVerified && (
          <Box textAlign="right" mt={1}>
            <Button onClick={handleClick} sx={{ color: "#F2353C" }}>
              Verify and get details
            </Button>
          </Box>
        )}
      </Box>
      {isloading && <Loader />}
      {isVerified && (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category"
            size="small"
            sx={{ mt: 2 }}
            value={state.category}
            name="Category"
            required
            fullWidth
          />
          {state.category === "Individual" && (
            <>
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.firstName}
                label="First Name"
                size="small"
                name="firstName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                value={state.middleName}
                label="Middle Name"
                size="small"
                name="middleName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.lastName}
                label="Last Name"
                size="small"
                name="lastName"
                fullWidth
              />
            </>
          )}
          {state.category === "Company" && (
            <>
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.fullName}
                label="Organisation name"
                size="small"
                name="legalName"
                fullWidth
              />
              <TextField
                required
                onChange={handleChange}
                value={state.tradeName}
                sx={{ mt: 2 }}
                label="Trade Name"
                name="tradeName"
                size="small"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                label="Constitution of Business"
                value={state.constitutionOfBusiness}
                size="small"
                name="constitutionOfBusiness"
                onChange={handleChange}
                fullWidth
              />
            </>
          )}
          <TextField
            onChange={handleChange}
            value={state.buildingName}
            sx={{ mt: 2 }}
            label="Building name"
            name="buildingName"
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            value={state.street}
            sx={{ mt: 2 }}
            label="Street"
            name="street"
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            sx={{ mt: 2 }}
            label="City"
            name="city"
            value={state.city}
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            sx={{ mt: 2 }}
            label="State"
            name="state"
            value={state.state}
            size="small"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            sx={{ mt: 2 }}
            value={state.pincode}
            name="pincode"
            label="Pincode"
            size="small"
            fullWidth
            required
          />
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 3 }}
            loading={isLoading}
            title="Submit"
          />
        </form>
      )}
    </>
  );
};
export default PanDetails;
