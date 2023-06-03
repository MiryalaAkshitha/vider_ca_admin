import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import SideNav from "views/billing/SideNav";
import { useDispatch } from "react-redux";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useEffect } from "react";

function SideNavBar() {
  useTitle("Billing");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

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
