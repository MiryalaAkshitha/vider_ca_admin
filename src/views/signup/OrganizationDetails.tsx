import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFieldChange,
  handleStep,
  selectSignup,
} from "redux/reducers/signUpSlice";
import { SubmitType } from "types";

function OrganizationDetails() {
  const state = useSelector(selectSignup);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      handleFieldChange({
        name: event.target.name,
        value: event.target.value,
      })
    );
  };

  const handleSubmit = (e: SubmitType) => {
    dispatch(handleStep("team"));
  };

  return (
    <Box>
      <Typography sx={{ mb: 1, textAlign: "center" }} variant="subtitle1">
        Organization Details
      </Typography>
      <Typography variant="body2" sx={{ textAlign: "center" }}>
        Please provide your organization details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mt={2}>
          <TextField
            sx={{ mt: 2 }}
            required
            onChange={handleChange}
            value={state.firmType}
            label="Type of firm"
            size="small"
            name="firmType"
            fullWidth
            select
          >
            <MenuItem value="ca">CA</MenuItem>
            <MenuItem value="cs">CS</MenuItem>
            <MenuItem value="cms">CMS</MenuItem>
          </TextField>
          <TextField
            required
            onChange={handleChange}
            value={state.firmName}
            sx={{ mt: 2 }}
            label="Firm name"
            name="firmName"
            size="small"
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            label="Firm status"
            value={state.firmStatus}
            size="small"
            name="firmStatus"
            required
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="ca">Sole Proprietor</MenuItem>
            <MenuItem value="cs">Partnership Firm</MenuItem>
            <MenuItem value="cms">LLP</MenuItem>
          </TextField>
          <TextField
            required
            onChange={handleChange}
            value={state.gstNumber}
            sx={{ mt: 2 }}
            label="GST Number"
            name="gstNumber"
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
            select
          >
            <MenuItem value="ca">Telangana</MenuItem>
            <MenuItem value="cs">Andhra Pradesh</MenuItem>
          </TextField>
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
            onChange={handleChange}
            sx={{ mt: 2 }}
            name="pincode"
            label="Pincode"
            size="small"
            value={state.pincode}
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
  );
}

export default OrganizationDetails;
