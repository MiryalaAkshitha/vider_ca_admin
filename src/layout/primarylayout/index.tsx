import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./Appbar";
import MainContent from "./MainContent";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import BottomAppbar from "./BottomAppbar";

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar />
      <SideNav />
      <MainContent>
        <Outlet />
      </MainContent>
      <BottomAppbar />
    </Box>
  );
}

export default Layout;
