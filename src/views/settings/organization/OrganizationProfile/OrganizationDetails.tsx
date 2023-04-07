import { DesktopDatePicker } from "@mui/lab";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { placeOfSupplyStates } from "data/placeOfSupply";
import SectionWrapper from "./SectionWrapper";

function OrganizationDetails({ state, setState }) {
  const handleChange = (e: any) => {
    if(e.target.name == 'placeOfSupply') {
      e.target.value = e.target.value.split('-')[1];
    }
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  const handleSupplyChange = (e: any, v: any) => {
    if(e.target.name == 'placeOfSupply') {
      e.target.value = e.target.value.split('-')[1];
    }
    setState((draft: any) => {
      draft['placeOfSupply'] = v.split('-')[1];
    });
  };

  return (
    <SectionWrapper title="Organization Details">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Category"
            name="category"
            disabled
            value={state.category || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Legal Name"
            name="legalName"
            value={state.legalName || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Trade Name"
            name="tradeName"
            value={state.tradeName || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Constitution of business"
            name="constitutionOfBusiness"
            value={state.constitutionOfBusiness || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
            onChange={handleChange}
            fullWidth
            label="Place of supply"
            name="placeOfSupply"
            value={state.placeOfSupply || ""}
          /> */}
          <Autocomplete
            onChange={(_, value) => handleSupplyChange(_, value)}
            value={placeOfSupplyStates.find((o: any) => o.split('-')[1] === state?.placeOfSupply) || ""}
            options={placeOfSupplyStates.map((item) => item) || []}
            getOptionLabel={(option: any) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                name="placeOfSupply"
                variant="outlined"
                fullWidth
                label="Location of Supplier"
              />
            )}
          />
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
        <Grid item xs={12} sm={6}>
          <DesktopDatePicker
            label="Registration Date"
            inputFormat="dd-MM-yyyy"
            value={state.registrationDate || null}
            onChange={(v) => {
              setState((draft: any) => {
                draft["registrationDate"] = v;
              });
            }}
            renderInput={(params) => (
              <TextField
                name="registrationDate"
                fullWidth
                size="medium"
                {...params}
              />
            )}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default OrganizationDetails;
