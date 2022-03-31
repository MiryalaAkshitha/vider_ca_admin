import { Grid, TextField } from "@mui/material";
import SectionWrapper from "./SectionWrapper";

function ContactDetails({ state, setState }) {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <SectionWrapper title="Contact Details">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            onChange={handleChange}
            label="Mobile Number"
            name="mobileNumber"
            value={state.mobileNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            onChange={handleChange}
            label="Alternate Mobile Number"
            name="alternateMobileNumber"
            value={state.alternateMobileNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email" name="email" value={state.email} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state.website}
            fullWidth
            onChange={handleChange}
            label="Website"
            name="website"
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default ContactDetails;
