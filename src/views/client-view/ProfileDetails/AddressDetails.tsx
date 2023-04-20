import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { useQuery } from "react-query";
import { ResType } from "types";

const AddressDetails = ({ data, setState }) => {
  const { data: states }: ResType = useQuery("states", getStates);

  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box mt={4}>
      <Typography mt={3} color="primary" variant="h6" sx={{ mb: 2 }}>
        Communication Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            label="Building Name"
            name="buildingName"
            value={data?.buildingName || ""}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Street"
            name="street"
            value={data?.street || ""}
            variant="outlined"
            size="small"
            fullWidth
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="City"
            name="city"
            value={data?.city || ""}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            onChange={(_, value) => setState({ ...data, state: value })}
            value={data?.state || ""}
            options={states?.data?.map((item) => item?.name) || []}
            getOptionLabel={(option: any) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="State"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Pincode"
            name="pincode"
            value={data?.pincode || ""}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AddressDetails;