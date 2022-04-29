import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStates } from "api/services/common";
import { useQuery } from "react-query";
import { ResType } from "types";
import TextFieldWithCopy from "./TextFieldWithCopy";

const OrganisationAddress = ({
  data,
  onUpdate,
  handleChange,

  setState,
}) => {
  const { data: states }: ResType = useQuery("states", getStates);
  return (
    <>
      <Typography mt={3} color="primary" variant="subtitle2" sx={{ mb: 3 }}>
        Organisation Address
      </Typography>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <TextFieldWithCopy
              label="Address"
              name="address"
              value={data?.address || ""}
              onChange={handleChange}
              onBlur={onUpdate}
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
              onBlur={onUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              onChange={(_, value) => setState({ ...data, state: value })}
              value={data?.state || ""}
              options={states?.data?.map((item) => item?.name) || []}
              onBlur={onUpdate}
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
              onBlur={onUpdate}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default OrganisationAddress;
