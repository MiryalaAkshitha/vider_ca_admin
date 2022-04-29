import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getUsers } from "api/services/users";
import { useQuery } from "react-query";
import { ResType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";
import TextFieldWithCopy from "./TextFieldWithCopy";

const BasicInformation = ({
  data,
  handleCategoryChange,
  handleChange,
  onUpdate,
}) => {
  const { data: users }: ResType = useQuery("users", getUsers);

  return (
    <>
      <Typography color="primary" variant="subtitle2" sx={{ mb: 3 }}>
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
              variant="outlined"
              onBlur={onUpdate}
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
          <Grid item xs={4}>
            <TextField
              label="Client Manager"
              name="clientManager"
              fullWidth
              onBlur={onUpdate}
              variant="outlined"
              value={data?.clientManager?.id || data?.clientManager}
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
          <Grid item xs={6}>
            <TextField
              label="Authorized Person"
              name="authorizedPerson"
              onChange={handleChange}
              onBlur={onUpdate}
              value={data?.authorizedPerson || ""}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="designation"
              name="Designation"
              onChange={handleChange}
              onBlur={onUpdate}
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
              onBlur={onUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithCopy
              label="Alternate Mobile Number"
              name="alternateMobileNumber"
              value={data?.alternateMobileNumber || ""}
              onChange={handleChange}
              onBlur={onUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <TextFieldWithCopy
              label="Email"
              name="email"
              value={data?.email || ""}
              onChange={handleChange}
              onBlur={onUpdate}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default BasicInformation;
