import { Grid, TextField } from "@mui/material";
import SectionWrapper from "../organization/SectionWrapper";

const PrimaryContactDetails = ({ state, setState }) => {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <>
      <SectionWrapper title="Primary Contact Details">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              fullWidth
              label="Full name"
              name="name"
              value={state.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              onChange={handleChange}
              label="Email Address"
              name="email"
              value={state.email}
            />
          </Grid>
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
        </Grid>
      </SectionWrapper>
    </>
  );
};
export default PrimaryContactDetails;
