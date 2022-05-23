import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import SideNav from "views/invoicing/SideNav";

function SideNavBar() {
  useTitle("Invoice");

  return (
    <Box display="flex" alignItems="flex-start">
      <SideNav />
      <Box flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default SideNavBar;
