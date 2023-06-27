import { Grid } from "@mui/material";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import DscNav from "views/dsc-register/DscNav";
function GstUi() {
    useTitle("Reports");

    return (
        <>
            <Grid container direction="row">
                <Grid item>
                    <DscNav />
                </Grid>
                <Grid item sx={{ flex: 1 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}

export default GstUi;