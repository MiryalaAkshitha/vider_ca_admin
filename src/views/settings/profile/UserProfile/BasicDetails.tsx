import { DesktopDatePicker } from "@mui/lab";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ProfileImage from "views/client-view/ProfileDetails/ProfileImage";
import ChangePassword from "./ChangePassword";
import SectionWrapper from "./SectionWrapper";

const BasicDetails = ({ state, setState }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <SectionWrapper title="Basic Details">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ProfileImage
                src={state?.imageUrl}
                onChange={(v: string) => {
                  setState({
                    ...state,
                    image: v,
                  });
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  ml: 3,
                }}
              >
                <Typography variant="h5">{state?.role}</Typography>
                <Typography variant="body2">{state?.employeeId}</Typography>
                <Typography variant="body2">{state?.email}</Typography>
              </Box>
            </Box>
            <div>
              <Button onClick={() => setOpen(true)} variant="outlined" color="secondary">
                Change Password
              </Button>
            </div>
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="fullName"
              label="Full Name"
              value={state?.fullName || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="mobileNumber"
              label="Mobile Number"
              inputProps={{
                pattern: "[0-9]{10}",
                title: "Enter valid Mobile Number",
              }}
              value={state?.mobileNumber || ""}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="personalMail"
              label="Personal Mail"
              value={state?.email || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <DesktopDatePicker
              label="Date of birth"
              value={state?.dob || null}
              onChange={(e) => {
                setState({ ...state, dob: e });
              }}
              inputFormat="dd-MM-yyyy"
              renderInput={(params) => <TextField variant="outlined" fullWidth {...params} />}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="fatherName"
              label="Father Name"
              value={state?.fatherName || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="address"
              label="Address"
              value={state?.address || ""}
            />
          </Grid>
        </Grid>
      </SectionWrapper>
      <ChangePassword open={open} setOpen={setOpen} />
    </>
  );
};

export default BasicDetails;
