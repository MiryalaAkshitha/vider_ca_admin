import { Grid, TextField } from "@mui/material";
import SectionWrapper from "./SectionWrapper";

function PrimaryContactDetails({ state, setState }) {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <SectionWrapper title="Authorized Signatory Details">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Name of Authorized Signatory"
            name="primaryContactFullName"
            value={state.primaryContactFullName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Authorized Signatory Email ID"
            name="primaryContactEmail"
            onChange={handleChange}
            value={state.primaryContactEmail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Authorized Signatory Mobile #"
            name="primaryContactMobileNumber"
            onChange={handleChange}
            value={state.primaryContactMobileNumber}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default PrimaryContactDetails;
