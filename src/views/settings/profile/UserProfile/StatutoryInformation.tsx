import { Close, DownloadOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import SectionWrapper from "./SectionWrapper";

const StatutoryInformation = ({ state, setState }) => {
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <SectionWrapper title="Statutory Information">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            fullWidth
            size="medium"
            onChange={handleChange}
            name="aadharNumber"
            label="Aadhar Number"
            value={state?.aadharNumber || ""}
          />
        </Grid>
        <Grid item xs={6}>
          {state?.aadharCard ? (
            <IdentityCard
              title="Aadhar Card"
              value={state?.aadharCard}
              file={state?.aadharCardUrl}
              onClose={() => setState({ ...state, aadharCard: null })}
            />
          ) : (
            <UploadImage
              widthoutIcon
              sx={{ minHeight: "60px" }}
              name="aadharCard"
              label="Upload Attachment"
              accept={["image/jpg", "image/jpeg", "application/pdf"]}
              onChange={(v) =>
                setState({
                  ...state,
                  aadharCard: v,
                })
              }
            />
          )}
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
          {state?.panCard ? (
            <IdentityCard
              title="Pan Card"
              value={state?.panCard}
              file={state?.panCardUrl}
              onClose={() => setState({ ...state, panCard: null })}
            />
          ) : (
            <UploadImage
              widthoutIcon
              sx={{ minHeight: "60px" }}
              accept={["image/jpg", "image/jpeg", "application/pdf"]}
              name="panCard"
              label="Upload Attachment"
              onChange={(v) => setState({ ...state, panCard: v })}
            />
          )}
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
          {state?.drivingLicense ? (
            <IdentityCard
              title="Driving License"
              value={state?.drivingLicense}
              file={state?.drivingLicenseUrl}
              onClose={() => setState({ ...state, drivingLicense: null })}
            />
          ) : (
            <UploadImage
              widthoutIcon
              sx={{ minHeight: "60px" }}
              name="drivingLicense"
              label="Upload Attachment"
              accept={["image/jpg", "image/jpeg", "application/pdf"]}
              onChange={(v) => setState({ ...state, drivingLicense: v })}
            />
          )}
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

const IdentityCard = ({ title, value, file, onClose }) => {
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
        <Box display="flex" gap={1}>
          <a href={file} target="_blank" rel="noopener noreferrer">
            <IconButton>
              <DownloadOutlined color="secondary" />
            </IconButton>
          </a>
          <IconButton onClick={onClose}>
            <Close color="secondary" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default StatutoryInformation;
