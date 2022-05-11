import {
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import Loader from "components/Loader";
import moment from "moment";
import { useQuery } from "react-query";
import { ResType } from "types";

const AdditionalInformation = ({ data, setState, apiData }) => {
  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const { data: labels, isLoading }: ResType = useQuery("labels", getLabels);

  if (isLoading) return <Loader />;

  return (
    <Box mt={3}>
      <Typography mt={3} color="primary" variant="h6" sx={{ mb: 2 }}>
        Additional Information
      </Typography>
      <Box>
        <Grid container spacing={3}>
          {data?.category === "individual" && (
            <Grid item xs={4}>
              <TextField
                label="Date of birth"
                name="dob"
                onChange={handleChange}
                value={data?.dob || ""}
                fullWidth
                type="date"
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          )}
          <Grid item xs={4}>
            <Autocomplete
              multiple
              id="tags-standard"
              onChange={(_, value) => {
                setState({ ...data, labels: value });
              }}
              value={data?.labels || []}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={labels?.data || []}
              getOptionLabel={(option: any) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Tags"
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Client Status"
              name="active"
              onChange={(e) => {
                setState({
                  ...data,
                  active: e.target.value === "active" ? true : false,
                });
              }}
              fullWidth
              select
              value={data?.active ? "active" : "inactive"}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            {!apiData?.active && (
              <Box mt={1}>
                <Typography variant="caption" color="secondary">
                  Inactive from{" "}
                  {moment(data?.inactiveAt).format("DD MMM YYYY - hh:mm a")}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Local Directory Path"
              name="localDirectoryPath"
              onChange={handleChange}
              value={data?.localDirectoryPath || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid item xs={6}>
            <TextField
              label="Notes"
              name="notes"
              onChange={handleChange}
              value={data?.notes || ""}
              placeholder="Write something here…"
              fullWidth
              multiline
              rows={5}
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default AdditionalInformation;
