import { Box, Button, TextField, Typography } from "@mui/material";
import { getGstDetails, getSandboxToken, signup } from "api/services/users";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { selectSignup } from "redux/reducers/signUpSlice";
import { SubmitType } from "types";

const GstDetails = () => {
  const [state, setState]: any = useState({});
  const [gstNumber, setGstNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isloading, setLoading] = useState<boolean>(false);
  const { fullName, email, password, mobileNumber } = useSelector(selectSignup);

  const handleClick = async () => {
    if (!gstNumber) return;

    setLoading(true);

    try {
      let token: any = await getSandboxToken();

      let response: any = await getGstDetails({
        gstNumber,
        token: token?.data?.access_token,
      });

      const result: any = response.data;

      setState({
        legalName: result?.data?.lgnm,
        tradeName: result?.data?.tradeNam,
        placeOfSupply: result?.data?.pradr?.addr?.stcd,
        registrationDate: result?.data?.rgdt,
        constitutionOfBusiness: result?.data?.ctb,
        gstStatus: result?.data?.sts,
        buildingName: result?.data?.pradr?.addr?.bnm,
        street: result?.data?.pradr?.addr?.st,
        city: result?.data?.pradr?.addr?.dst,
        state: result?.data?.pradr?.addr?.stcd,
        pincode: result?.data?.pradr?.addr?.pncd,
      });
      setIsVerified(true);
    } catch (e: any) {
      snack.error(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
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

  const handleSubmit = async (e: SubmitType) => {
    e.preventDefault();
    mutate({
      ...state,
      fullName,
      email,
      password,
      mobileNumber,
      gstNumber,
      category: "COMPANY",
    });
  };

  return (
    <>
      <Box>
        <TextField
          required
          onChange={(e) => setGstNumber(e.target.value)}
          value={gstNumber}
          sx={{ mt: 2 }}
          label="GST Number"
          name="gstNumber"
          size="small"
          fullWidth
        />
        {!isVerified && (
          <Typography
            sx={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleClick} sx={{ color: "#F2353C" }}>
              Get Tax payer details
            </Button>
          </Typography>
        )}
      </Box>
      {isloading && <Loader />}
      {isVerified && (
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ mt: 2 }}
            required
            onChange={handleChange}
            value={state.legalName}
            label="Legal name"
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
            required
            onChange={handleChange}
            value={state.placeOfSupply}
            sx={{ mt: 2 }}
            label="State Jurisdiction / Place of supply"
            name="placeOfSupply"
            size="small"
            fullWidth
          />
          <TextField
            required
            onChange={handleChange}
            value={state.registrationDate}
            sx={{ mt: 2 }}
            label="Date of Registration"
            name="registrationDate"
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
          <TextField
            required
            onChange={handleChange}
            value={state.gstStatus}
            sx={{ mt: 2 }}
            label="GSTN status"
            name="gstStatus"
            size="small"
            fullWidth
          />
          <TextField
            required
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
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 3 }}
            title="Submit"
          />
        </form>
      )}
    </>
  );
};
export default GstDetails;