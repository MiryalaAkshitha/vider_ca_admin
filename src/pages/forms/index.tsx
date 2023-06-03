import { Grid } from "@mui/material";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import FormNav from "../../views/forms/FormNav";
import { useDispatch } from "react-redux";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useEffect } from "react";

const Forms = () => {
  useTitle("Forms");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  return (
    <Grid container direction="row">
      <Grid item>
        <FormNav />
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Forms;
