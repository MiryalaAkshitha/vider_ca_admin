import { DownloadOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import { updateProfile } from "api/services/users";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import SectionWrapper from "./SectionWrapper";

const StatutoryInformation = ({ data }) => {
  const queryClient = useQueryClient();

  const [editable, setEditable] = useState(false);
  const [state, setState] = useState({
    aadharNumber: "",
    aadharCard: "",
    panNumber: "",
    panCard: "",
    drivingLicenseNumber: "",
    drivingLicense: "",
  });

  useEffect(() => {
    setState({
      aadharNumber: data?.profile?.aadharNumber,
      aadharCard: data?.profile?.aadharCard,
      panNumber: data?.profile?.panNumber,
      panCard: data?.profile?.panCard,
      drivingLicenseNumber: data?.profile?.drivingLicenseNumber,
      drivingLicense: data?.profile?.drivingLicense,
    });
  }, [data]);

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = () => {
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
      title="Statutory Information"
    >
      {!editable ? (
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={6}>
            <IdentityCard
              title="Aadhar Card"
              value={data?.profile?.aadharNumber}
              file={data?.profile?.aadharCardUrl}
            />
          </Grid>
          <Grid item xs={6}>
            <IdentityCard
              title="Pan Card"
              value={data?.profile?.panNumber}
              file={data?.profile?.panCardUrl}
            />
          </Grid>
          <Grid item xs={6}>
            <IdentityCard
              title="Driving License"
              value={data?.profile?.drivingLicenseNumber}
              file={data?.profile?.drivingLicenseUrl}
            />
          </Grid>
        </Grid>
      ) : (
        <EditSection state={state} setState={setState} />
      )}
    </SectionWrapper>
  );
};

const EditSection = ({ state, setState }) => {
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <Grid container alignItems="center" spacing={2} sx={{ p: 2 }}>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          fullWidth
          size="medium"
          onChange={handleChange}
          name="aadharNumber"
          label="Aadhar Number"
          value={state?.aadharNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <UploadImage
          widthoutIcon
          sx={{ minHeight: "60px" }}
          name="aadharCard"
          label="Upload Attachment"
          onChange={(v) => setState({ ...state, aadharCard: v })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          fullWidth
          size="medium"
          onChange={handleChange}
          name="panNumber"
          label="Pan Number"
          value={state?.panNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <UploadImage
          widthoutIcon
          sx={{ minHeight: "60px" }}
          name="panCard"
          label="Upload Attachment"
          onChange={(v) => setState({ ...state, panCard: v })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          fullWidth
          size="medium"
          onChange={handleChange}
          name="drivingLicenseNumber"
          label="Driving license number"
          value={state?.drivingLicenseNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <UploadImage
          widthoutIcon
          sx={{ minHeight: "60px" }}
          name="drivingLicense"
          label="Upload Attachment"
          onChange={(v) => setState({ ...state, drivingLicense: v })}
        />
      </Grid>
    </Grid>
  );
};

const IdentityCard = ({ title, value, file }) => {
  return (
    <Box
      sx={{
        background: "#F5F5F5",
        borderRadius: 2,
        py: 1,
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Box>
        <Typography variant="body2" color="rgba(0,0,0,0.5)">
          {title}
        </Typography>
        <Typography variant="body1">{value ? value : "NA"}</Typography>
      </Box>
      {file && (
        <Box>
          <a href={file} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <DownloadOutlined color="secondary" />
            </IconButton>
          </a>
        </Box>
      )}
    </Box>
  );
};

export default StatutoryInformation;
