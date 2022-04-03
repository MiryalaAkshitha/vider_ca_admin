import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import FormNav from "./FormNav";
import { styled } from "@mui/styles";

const StyledGrid = styled(Grid)(() => ({
  width: "85%",
  height: "90vh",
}));

const Forms = () => {
  return (
    <Grid container direction={"row"} style={{ height: "100%" }}>
      <Grid item style={{ borderRight: "1px solid #2222221A" }}>
        <FormNav />
      </Grid>
      <StyledGrid
        item
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Outlet />
      </StyledGrid>
    </Grid>
  );
};

export default Forms;
