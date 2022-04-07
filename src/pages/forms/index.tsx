import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import FormNav from "../../views/forms/FormNav";

const Forms = () => {
  return (
    <Grid
      container
      direction={"row"}
      style={{ height: "100%", flexWrap: "nowrap" }}
    >
      <Grid item style={{ borderRight: "1px solid #2222221A", height: "90vh" }}>
        <FormNav />
      </Grid>
      <Grid item sx={{ flex: 1 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Forms;
