import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { withRouter } from "react-router";
import { LayoutProps } from "types";
import Appbar from "./Appbar";
import SideNav from "./SideNav";
import MainContent from "./MainContent";

function SettingsLayout(props: LayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar />
      <SideNav />
      <MainContent routes={props.routes} />
    </Box>
  );
}

export default withRouter(SettingsLayout);
