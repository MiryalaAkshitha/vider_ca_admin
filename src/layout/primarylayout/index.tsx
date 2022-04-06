import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./app-bar/Appbar";
import MainContent from "./MainContent";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";

function Layout() {
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

export default Layout;
