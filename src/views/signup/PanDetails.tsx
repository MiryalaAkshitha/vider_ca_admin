import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { getPanDetails, getSandboxToken, signup } from "api/services/users";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const [panNumber, setPanNumber] = useState("");
  const [panLoading, setPanLoading] = useState(false);
  const { email, password, mobileNumber } = useSelector(selectSignup);

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

  const verifyPan = async () => {
    if (!panNumber) return snack.error("Enter Pan Number");;

    setPanLoading(true);

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
      setPanLoading(false);
    }

  };

  const PanAdornment = () => {

    return (
      <>
        {panLoading && <CircularProgress size="1rem" />}
        {isVerified && !panLoading && (
          <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />
        )}
        {!isVerified && !panLoading && (
          <Button color="error" size="small" onClick={verifyPan}>
            Verify
          </Button>
        )}
      </>
    );
  };

  const handlePanChange = (e: any) => {
    setPanNumber(e.target.value)
    setIsVerified(false)
  }
  return (
    <>
      <Box>
        <TextField
          required
          onChange={handlePanChange}
          value={panNumber}
          sx={{ mt: 2 }}
          label="Pan Number"
          name="panNumber"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: <PanAdornment />,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
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
