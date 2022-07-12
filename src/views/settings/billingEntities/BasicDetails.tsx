import { Grid, Box, MenuItem, TextField } from "@mui/material";
import { ORGANIZATION_CATEGORIES, ORGANIZATION_TYPES } from "data/constants";
import SectionWrapper from "../organization/SectionWrapper";

const BasicDetails = ({ state, setState }) => {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <>
      <Box>
        <SectionWrapper title="Basic details">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleChange}
                fullWidth
                label="Billing Entity Name"
                name="name"
                value={state?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                onChange={handleChange}
                label="Billing Entity Category"
                name="category"
                value={state?.category}
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
                fullWidth
                select
                onChange={handleChange}
                label="Billing Entity Type"
                name="type"
                value={state.type}
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
                label="Billing Entity Registration Number"
                name="registrationNumber"
                value={state.registrationNumber || ""}
              />
            </Grid>
          </Grid>
        </SectionWrapper>
      </Box>
    </>
  );
};
export default BasicDetails;
