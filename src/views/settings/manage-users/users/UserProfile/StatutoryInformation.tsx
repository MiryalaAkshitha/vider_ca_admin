import { DownloadOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import SectionWrapper from "./SectionWrapper";

const StatutoryInformation = ({ data }) => {
  return (
    <SectionWrapper title="Statutory Information">
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
      </Grid>
    </SectionWrapper>
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
