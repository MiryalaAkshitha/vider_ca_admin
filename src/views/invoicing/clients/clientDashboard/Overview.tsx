import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { profileImage } from "assets";
import OverviewRightSide from "./OverviewRightSide";

const Overview = () => {
  return (
    <Box p={2} display="flex">
      <Box sx={{ width: "32%" }}>
        <Paper>
          <Box p={2}>
            <Box mb={1}><Typography variant="caption">Personal details</Typography></Box>
            <Divider />
            <Grid mt={1} container>
              <Grid mt={1} item xs={4}>
                <img src={profileImage} alt="" width={90} height={100} style={{ borderRadius: "15px" }} />
              </Grid>
              <Grid mt={3} item xs={8}>
                <Typography p={2} variant="subtitle2" >Venkat yellapragada</Typography>
                <Typography p={2} variant="caption"> Individual</Typography>
              </Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">Client ID</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography >:</Typography>
              </Grid>
              <Grid mt={1} item xs={7}>
                <Typography variant="subtitle2">VD9853</Typography>
              </Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">Mobile number</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography >:</Typography>
              </Grid>
              <Grid mt={1} item xs={7}>
                <Typography variant="subtitle2">9398078022</Typography>
              </Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">Mail Address</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography >:</Typography>
              </Grid>
              <Grid mt={1} mb={1} item xs={7}>
                <Typography variant="subtitle2">Venkat@jss.in</Typography>
              </Grid>
              <Grid xs={12}><Divider /></Grid>
              <Grid item xs={12}>
                <Box mt={1} mb={1}><Typography variant="caption">Statutory details</Typography></Box>
              </Grid>
              <Grid xs={12}><Divider /></Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">GSTIN</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid mt={1} item xs={7}>
                <Typography variant="subtitle2">APKSD46536</Typography>
              </Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">PAN number</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid mt={1} item xs={7}>
                <Typography variant="subtitle2">APKSD46536</Typography>
              </Grid>
              <Grid mt={1} item xs={4}>
                <Typography variant="caption">Address</Typography>
              </Grid>
              <Grid mt={1} item xs={1}>
                <Typography>:</Typography>
              </Grid>
              <Grid mt={1} mb={1} item xs={7}>
                <Typography variant="subtitle2">Boston, MA 02215, United States</Typography>
              </Grid>
            </Grid>
            <Divider />
            <Box mt={1} mb={1}> <Typography variant="caption"> Contact person details</Typography></Box>
            <Divider />
            <Box mt={2} p={2} sx={{ width: "100%", border: "2px solid #182F531A", display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle2">Shiva</Typography>
                <Typography variant="caption">Intern</Typography>
              </Box>
              <Box sx={{ color: "#0D47A1" }}>
                <Typography variant="body2">6484797897</Typography>
                <Typography variant="caption"> sjhgjh@gmail.com</Typography>
              </Box>
            </Box>
            <Box mt={2} p={2} sx={{ width: "100%", border: "2px solid #182F531A", display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="subtitle2">Surya</Typography>
                <Typography variant="caption">Junior CA</Typography>
              </Box>
              <Box sx={{ color: "#0D47A1" }}>
                <Typography variant="body2">6484797897</Typography>
                <Typography variant="caption"> sjhgjh@gmail.com</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Box sx={{ width: "100%" }}>
        <OverviewRightSide />
      </Box>
    </Box>
  );
}
export default Overview;