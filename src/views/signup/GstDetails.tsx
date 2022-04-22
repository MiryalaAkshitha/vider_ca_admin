import { Box, Button, TextField } from "@mui/material";
import { SubmitType } from "types";

const GstDetails = ({ state, setState }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: SubmitType) => {};

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
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
              value={state.stateJurisdiction}
              sx={{ mt: 2 }}
              label="State Jurisdiction / Place of supply"
              name="stateJurisdiction"
              size="small"
              fullWidth
            />
            <TextField
              required
              onChange={handleChange}
              value={state.dateOfRegistration}
              sx={{ mt: 2 }}
              label="Date of Registration"
              name="dateOfRegistration"
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
              value={state.GSTNStatus}
              sx={{ mt: 2 }}
              label="GSTN status"
              name="GSTNStatus"
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
              value={state.pinCode}
              name="pinCode"
              label="pincode"
              size="small"
              fullWidth
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};
export default GstDetails;
