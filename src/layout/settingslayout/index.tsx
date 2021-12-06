import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import MainContent from "./MainContent";
import SideNav from "./SideNav";

function SettingsLayout(props: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar />
      <SideNav />
      <MainContent>
        <Outlet />
      </MainContent>
    </Box>
  );
}

export default SettingsLayout;
