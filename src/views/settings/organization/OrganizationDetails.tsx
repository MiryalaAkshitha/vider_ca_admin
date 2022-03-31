import { Grid, MenuItem, TextField } from "@mui/material";
import { ORGANIZATION_CATEGORIES, ORGANIZATION_TYPES } from "utils/constants";
import SectionWrapper from "./SectionWrapper";

function OrganizationDetails({ state, setState }) {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <SectionWrapper title="Organization Details">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            onChange={handleChange}
            label="Organization Category"
            name="organizationCategory"
            value={state.organizationCategory}
          >
            {ORGANIZATION_CATEGORIES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Organization Name"
            name="organizationName"
            value={state.organizationName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            onChange={handleChange}
            label="Organization Type"
            name="organizationType"
            value={state.organizationType}
          >
            {ORGANIZATION_TYPES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            onChange={handleChange}
            label="Registration Number"
            name="registrationNumber"
            value={state.registrationNumber || ""}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default OrganizationDetails;
