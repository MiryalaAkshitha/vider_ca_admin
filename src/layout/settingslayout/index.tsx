import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomAppbar from "layout/primarylayout/BottomAppbar";
import { StyledSettingsMainContent } from "layout/styles";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";
import SideNav from "./SideNav";

function SettingsLayout() {
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
      <StyledSettingsMainContent>
        <Toolbar />
        <Outlet />
        <BottomAppbar />
      </StyledSettingsMainContent>
    </Box>
  );
}

export default SettingsLayout;
