import { DesktopDatePicker } from "@mui/lab";
import { Grid, TextField, Typography } from "@mui/material";
import PasswordField from "views/login/PasswordField";

function DscDetails({ state, setState }) {
  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography mb={3} variant="subtitle2" color="primary">
        DSC Holder Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="DSC Holder Name"
            name="holderName"
            value={state?.holderName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Email ID"
            name="email"
            value={state?.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Mobile Number"
            name="mobileNumber"
            value={state?.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="DSC Holder Designation"
            name="holderDesignation"
            value={state?.holderDesignation}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <DesktopDatePicker
            label="DSC Expiry Date"
            inputFormat="dd-MM-yyyy"
            value={state.expiryDate}
            onChange={(value) => {
              setState({ ...state, expiryDate: value });
            }}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={4}>
          <PasswordField
            value={state?.password}
            name="password"
            onChange={handleChange}
            label="DSC Password"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Token Number"
            name="tokenNumber"
            value={state?.tokenNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="PAN"
            name="panNumber"
            value={state?.panNumber}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default DscDetails;
