import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import ChangeRole from "./ChangeRole";
import Detail from "./Detail";
import SectionWrapper from "./SectionWrapper";

const BasicDetails = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <SectionWrapper title="Basic Details">
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap={2} alignItems="center">
              <div>
                <Avatar sx={{ width: 80, height: 80 }} src={data?.imageUrl} />
              </div>
              <div>
                <Typography variant="subtitle2" color="primary">
                  {data?.fullName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {data?.role?.name}
                </Typography>
              </div>
            </Box>
            <Box>
              <Button variant="outlined" color="secondary" onClick={() => setOpen(true)}>
                Change Role
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Detail title="Employee Id" value={data?.profile?.employeeId} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Mobile Number" value={data?.mobileNumber} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Personal Email" value={data?.email} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Work Email" value={data?.profile?.workEmail} />
        </Grid>
        <Grid item xs={3}>
          <Detail
            title="Date of joining"
            value={
              data?.profile?.dateOfJoining ? moment(data?.profile?.dateOfJoining).format("YYYY-MM-DD") : null
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Date of birth" value={data?.profile?.dob} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Father's name" value={data?.profile?.fatherName} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Address" value={data?.profile?.address} />
        </Grid>
      </Grid>
      <ChangeRole open={open} setOpen={setOpen} role={data?.role?.id} userId={data?.id} />
    </SectionWrapper>
  );
};

export default BasicDetails;
