import { Autocomplete, Grid, TextField } from "@mui/material";
import { getStates } from "api/services/common";
import { useQuery } from "react-query";
import { ResType } from "types";
import SectionWrapper from "./SectionWrapper";

function AddressDetails({ state, setState }) {
  const { data: states }: ResType = useQuery("states", getStates);

  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <SectionWrapper title="Address Details">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Building Name"
            name="buildingName"
            value={state?.buildingName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Street"
            name="street"
            value={state?.street}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={state?.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            onChange={(_, value) =>
              setState((draft: any) => {
                draft.state = value;
              })
            }
            value={state?.state || ""}
            options={states?.data?.map((item) => item?.name) || []}
            getOptionLabel={(option: any) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                label="State"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pincode"
            name="pincode"
            value={state.pincode}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default AddressDetails;
