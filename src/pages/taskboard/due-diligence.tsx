import { Box, Grid, Paper } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import Fields from "views/taskboard/taskview/duediligence/Fields";
import Forms from "views/taskboard/taskview/duediligence/Forms";

function DueDiligence() {
  useTitle("Due Diligence");

  return (
    <Box p={2} bgcolor="white">
      <BreadCrumbs page="dueDiligence" />
      <Box pt={5} py={3}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Paper elevation={1} sx={{ p: 3, minHeight: "70vh" }}>
              <Forms />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Fields />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DueDiligence;
