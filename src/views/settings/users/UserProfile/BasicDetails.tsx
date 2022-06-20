import { DesktopDatePicker } from "@mui/lab";
import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import { updateProfile } from "api/services/users";
import { snack } from "components/toast";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { emailPattern } from "utils/patterns";
import ProfileImage from "views/clients/clients/ProfileDetails/ProfileImage";
import Detail from "./Detail";
import SectionWrapper from "./SectionWrapper";

const BasicDetails = ({ data }) => {
  const queryClient = useQueryClient();

  const [editable, setEditable] = useState(false);
  const [state, setState] = useState({
    fullName: "",
    mobileNumber: "",
    dob: "",
    fatherName: "",
    address: "",
    workEmail: "",
    image: "",
  });

  useEffect(() => {
    setState({
      fullName: data?.fullName,
      mobileNumber: data?.mobileNumber,
      image: data?.image,
      dob: data?.profile?.dob,
      fatherName: data?.profile?.fatherName,
      address: data?.profile?.address,
      workEmail: data?.profile?.workEmail,
    });
  }, [data]);

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
      setEditable(false);
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = () => {
    if (state.workEmail && !emailPattern.test(state.workEmail)) {
      return snack.error("Invalid email");
    }

    mutate({
      ...state,
      id: data?.id,
      type: "user",
    });
  };

  return (
    <SectionWrapper
      editable={editable}
      onSave={handleSubmit}
      setEditable={setEditable}
      title="Basic Details"
    >
      {editable ? (
        <EditSection state={state} setState={setState} data={data} />
      ) : (
        <ViewSection data={data} />
      )}
    </SectionWrapper>
  );
};

const ViewSection = ({ data }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
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
            data?.profile?.dateOfJoining
              ? moment(data?.profile?.dateOfJoining).format("YYYY-MM-DD")
              : null
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
  );
};

const EditSection = ({ state, setState, data }) => {
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      <Grid item xs={12}>
        <ProfileImage
          src={data?.imageUrl}
          onChange={(v) => {
            setState({
              ...state,
              image: v,
            });
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="fullName"
          label="Full Name"
          sx={{ mb: 2 }}
          value={state?.fullName}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="mobileNumber"
          label="Mobile Number"
          sx={{ mb: 2 }}
          value={state?.mobileNumber}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="workEmail"
          label="Work Email"
          sx={{ mb: 2 }}
          value={state?.workEmail}
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
            <TextField
              variant="outlined"
              sx={{ mb: 2 }}
              fullWidth
              size="small"
              {...params}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="fatherName"
          label="Father Name"
          sx={{ mb: 2 }}
          value={state?.fatherName}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          onChange={handleChange}
          name="address"
          label="Address"
          sx={{ mb: 2 }}
          value={state?.address}
        />
      </Grid>
    </Grid>
  );
};

export default BasicDetails;
