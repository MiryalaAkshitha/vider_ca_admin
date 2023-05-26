import { Grid } from "@mui/material";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import ReportsNav from "views/reports/ReportsNav";
import { useDispatch } from "react-redux";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useEffect } from "react";

function Reports() {
  useTitle("Reports");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

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
