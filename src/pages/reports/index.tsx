import { ArrowForward } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { reportsList } from "data/reports";
import useTitle from "hooks/useTitle";
import { Link, Outlet } from "react-router-dom";
import ReportsNav from "views/reports/ReportsNav";
import CustomReports from "./custom-reports";
import PredefinedReports from "./predefined-reports";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
function Reports() {
  useTitle("Reports");

  return (
    <>
    <Grid container direction="row">
    <Grid item>
      <ReportsNav />
    </Grid>
    <Grid item sx={{ flex: 1 }}>
      <Outlet />
    </Grid>
  </Grid>
  </>
  );
}

export default Reports;
