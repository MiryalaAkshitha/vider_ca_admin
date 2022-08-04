import { DesktopDatePicker } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
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
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ProfileImage
              src={state?.imageUrl}
              onChange={(v: string) => {
                setState({
                  ...state,
                  image: v,
                });
              }}
            />
            <div>
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                color="secondary"
              >
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
              value={state?.mobileNumber || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleChange}
              name="workEmail"
              label="Work Email"
              value={state?.workEmail || ""}
            />
          </Grid>
          <Grid item xs={4}>
            <DesktopDatePicker
              label="Date of birth"
              value={state?.dob || null}
              onChange={(e) => {
                setState({ ...state, dob: e });
              }}
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              renderInput={(params) => (
                <TextField variant="outlined" fullWidth {...params} />
              )}
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
