import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Appbar from "./Appbar";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import BottomAppbar from "./BottomAppbar";
import { useEffect } from "react";
import { StyledMainContent } from "layout/styles";
import { Toolbar } from "@mui/material";

function Layout() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Appbar />
      <SideNav />
      <StyledMainContent>
        <Toolbar />
        <Outlet />
      </StyledMainContent>
      <BottomAppbar />
    </Box>
  );
}

export default Layout;
