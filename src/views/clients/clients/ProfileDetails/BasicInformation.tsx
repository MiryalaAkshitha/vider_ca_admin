import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { ResType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";
import TextFieldWithCopy from "./TextFieldWithCopy";

const BasicInformation = ({ data, setState }) => {
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
    (item) => item.value === data?.category
  )?.subCategories;

  const { data: users }: ResType = useQuery("users", getUsers);

  return (
    <Box mt={2}>
      <Typography color="primary" variant="h6" sx={{ mb: 2 }}>
        Basic Information
      </Typography>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TextField
              disabled
              label="Client Id"
              name="clientId"
              value={data?.clientId || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Display Name"
              name="displayName"
              value={data?.displayName || ""}
              onChange={handleChange}
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
              label="Client Category"
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
                size="small"
                select
                onChange={handleChange}
                value={data?.subCategory ?? ""}
                InputLabelProps={{ shrink: true }}
                required
                name="subCategory"
                label="Client Sub Category"
              >
                {subCategories?.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs={4}>
            <TextField
              label="Client Manager"
              name="clientManager"
              fullWidth
              variant="outlined"
              value={data?.clientManager?.id || data?.clientManager || ""}
              size="small"
              onChange={handleChange}
              select
              InputLabelProps={{ shrink: true }}
            >
              {users?.data?.map((item: any, index: number) => (
                <MenuItem key={index} value={item?.id}>
                  {item?.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Authorized Person"
              name="authorizedPerson"
              onChange={handleChange}
              value={data?.authorizedPerson || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Designation"
              name="designation"
              onChange={handleChange}
              value={data?.designation || ""}
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
              value={data?.mobileNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithCopy
              label="Alternate Mobile Number"
              name="alternateMobileNumber"
              value={data?.alternateMobileNumber || ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithCopy
              label="Email"
              name="email"
              value={data?.email || ""}
              onChange={handleChange}
            />
          </Grid>
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
        </Grid>
      </Box>
    </Box>
  );
};
export default BasicInformation;
