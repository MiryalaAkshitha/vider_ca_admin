import { Grid } from "@mui/material";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import FormNav from "../../views/forms/FormNav";

const Forms = () => {
  useTitle("Forms");

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
