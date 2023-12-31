import { Box, Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { getPanDetails, getSandboxToken, signup } from "api/services/users";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectSignup } from "redux/reducers/signUpSlice";
import { ResType, SubmitType } from "types";
import { getStates } from "api/services/common";
import { handleError } from "utils/handleError";
// import FormAutoComplete from "components/FormFields/FormAutocomplete";
import Autocomplete from "@mui/material/Autocomplete";

const PanDetails = () => {
  const [state, setState] = useState<any>({});
  const [isVerified, setIsVerified] = useState(false);
  const [panNumber, setPanNumber] = useState("");
  const [panLoading, setPanLoading] = useState(false);
  const { email, password, mobileNumber } = useSelector(selectSignup);

  const { data: states }: ResType = useQuery("states", getStates);

  const { mutate, isLoading } = useMutation(signup, {
    onSuccess: (res: any) => {
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/";
    },
    onError: (err: any) => {
      snack.error(handleError(err));
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
    if (!panNumber) return snack.error("Enter Pan Number");

    setPanLoading(true);

    try {
      let token: any = await getSandboxToken();

      let response: any = await getPanDetails({
        panNumber,
        token: token?.data?.access_token,
      });

      // console.log(response);

      // const data: any = response?.data;
      if (response.status === "INVALID") {
        return snack.error("Invalid PAN");
      }
      const formateddata = getFabUtilityClass(response.data)

      setState({
        category: formateddata?.category,
        firstName: formateddata?.firstName,
        middleName: formateddata?.middleName,
        lastName: formateddata?.lastName,
        fullName: formateddata?.fullName,
        legalName: formateddata?.fullName,
        // tradeName: data?.data?.tradeName,
        // dateOfFormation: data?.data?.last_updated,
        // buildingName: data?.data?.buildingName,
        // street: data?.data?.street,
        // city: data?.data?.city,
        // state: data?.data?.state,
        // pincode: data?.data?.pinCode,
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
        {isVerified && !panLoading && <CheckCircleIcon fontSize="small" sx={{ color: "green" }} />}
        {!isVerified && !panLoading && (
          <Button color="error" size="small" onClick={verifyPan}>
            Verify
          </Button>
        )}
      </>
    );
  };

  const getFabUtilityClass = (input: any) => {

    const pandetails = {
      firstName: '',
      lastName: '',
      category: '',
      middleName: '',
      fullName: '',
      legalName: '',
    }

    if (input.first_name) {
      pandetails.firstName = input.first_name
    }
    if (input.middle_name) {
      pandetails.middleName = input.middle_name
    }
    if (input.last_name) {
      pandetails.lastName = input.last_name
    }
    if (input.full_name) {
      pandetails.fullName = input.full_name
    }
    if (input.category) {
      pandetails.category = input.category
    }
    return pandetails
  }

  const handlePanChange = (e: any) => {
    setPanNumber(e.target.value);
    setIsVerified(false);
  };
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
          onKeyDown={(e: any) => {
            if (e.keyCode === 13) {
              verifyPan();
            }
          }}
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
            disabled
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
                disabled
                name="firstName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                onChange={handleChange}
                value={state.middleName}
                label="Middle Name"
                size="small"
                disabled
                name="middleName"
                fullWidth
              />

              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.lastName}
                label="Last Name / Surname"
                size="small"
                disabled
                name="lastName"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.fullName}
                label="Full Name"
                size="small"
                disabled
                name="FullName"
                fullWidth
              />
            </>
          )}
          {state.category !== "Individual" && (
            <>
              <TextField
                required
                onChange={handleChange}
                value={state.lastName}
                sx={{ mt: 2 }}
                label="Surname / Last Name"
                name="lastName"
                disabled
                size="small"
                fullWidth
              />
              <TextField
                sx={{ mt: 2 }}
                required
                onChange={handleChange}
                value={state.fullName}
                label="Organisation Name / Trade Name"
                size="small"
                name="organisationName"
                fullWidth
              />
            </>
          )}
          <TextField
            required
            onChange={handleChange}
            value={state.buildingName}
            sx={{ mt: 2 }}
            label="H.No/Flat/Name of the Premises"
            name="buildingName"
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            value={state.street}
            sx={{ mt: 2 }}
            label="Road/Street/Area"
            name="street"
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            sx={{ mt: 2 }}
            label="Town/City/District"
            name="city"
            value={state.city}
            size="small"
            fullWidth
          />
          <Autocomplete
            sx={{ mt: 2 }}
            disablePortal
            onChange={(e, v) => setState({ ...state, state: v })}
            id="combo-box-demo"
            size="small"
            options={states?.data?.map((item: any) => item.name) || []}
            renderInput={(params) => (
              <TextField required {...params} label="State / Union Territory" />
            )}
          />
          <TextField
            onChange={handleChange}
            sx={{ mt: 2 }}
            value={state.pincode}
            name="pincode"
            label="Pincode/Zip Code"
            inputProps={{
              pattern: "[0-9]{6}",
              title: "Enter valid pincode",
            }}
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
