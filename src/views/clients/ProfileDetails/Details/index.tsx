import {
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import moment from "moment";
import { useQuery } from "react-query";
import { ResType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";
import ContactPersonDetails from "../ContactPersonDetails";
import TextFieldWithCopy from "./TextFieldWithCopy";

interface IDetailsProps {
  data: any;
  setState: (data: any) => void;
}

function Details({ data, setState }: IDetailsProps) {
  const { data: labels, isLoading }: ResType = useQuery("labels", getLabels);

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    "users",
    getUsers
  );

  const handleChange = (e: any) => {
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: any) => {
    setState({
      ...data,
      category: e.target.value,
      subCategory: null,
    });
  };

  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === data.category
  )?.subCategories;

  if (isLoading || userLoading) return <Loader />;

  return (
    <Box mt={5}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <TextField
            disabled
            label="Client Id"
            name="clientId"
            value={data?.clientId}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            select
            onChange={handleCategoryChange}
            value={data?.category ?? ""}
            InputLabelProps={{ shrink: true }}
            required
            name="category"
            label="Category"
          >
            {CLIENT_CATEGORIES.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {subCategories && (
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              required
              name="subCategory"
              onChange={handleChange}
              size="small"
              value={data?.subCategory || ""}
              InputLabelProps={{ shrink: true }}
              select
              label="Sub Category"
            >
              {subCategories.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs={4}>
          <TextField
            label="Display Name"
            name="displayName"
            onChange={handleChange}
            value={data?.displayName}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Authorized Person"
            name="authorizedPerson"
            onChange={handleChange}
            value={data?.authorizedPerson}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label="Mobile Number"
            name="mobileNumber"
            value={data?.mobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label="Alternate Mobile Number"
            name="alternateMobileNumber"
            value={data?.alternateMobileNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextFieldWithCopy
            label="Email"
            name="email"
            value={data?.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={8}>
          <TextFieldWithCopy
            label="Address"
            name="address"
            value={data?.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="City"
            name="city"
            value={data?.city}
            fullWidth
            variant="outlined"
            size="small"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="State"
            name="state"
            value={data?.state}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Pincode"
            name="pincode"
            value={data?.pincode}
            fullWidth
            variant="outlined"
            onChange={handleChange}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Client Manager"
            name="clientManager"
            fullWidth
            variant="outlined"
            value={data?.clientManager?.id || data?.clientManager}
            size="small"
            onChange={handleChange}
            select
            InputLabelProps={{ shrink: true }}
          >
            {users?.data?.map((item, index) => (
              <MenuItem key={index} value={item?.id}>
                {item?.firstName + " " + item?.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Date of birth"
            name="dob"
            onChange={handleChange}
            value={data?.dob}
            fullWidth
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(_, value) => setState({ ...data, labels: value })}
            value={data?.labels || []}
            options={labels?.data || []}
            getOptionLabel={(option: any) => option?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Labels"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Status"
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
          {!data?.active && (
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
            value={data?.localDirectoryPath}
            fullWidth
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <ContactPersonDetails data={data?.contactPersons} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Typography color="primary" variant="subtitle2" sx={{ mb: 3 }}>
            Pan Details
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextFieldWithCopy
                    label="Pan Number"
                    name="panNumber"
                    value={data?.panNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button color="primary" variant="outlined">
                    Verify
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="First Name"
                disabled
                name="firstName"
                value={data?.firstName}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Middle Name"
                disabled
                name="middleName"
                value={data?.middleName}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Last Name"
                disabled
                name="lastName"
                value={data?.lastName}
                fullWidth
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Notes"
            name="notes"
            sx={{ mt: 2 }}
            onChange={handleChange}
            value={data?.notes}
            fullWidth
            placeholder="Write something here…"
            multiline
            rows={8}
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Details;
