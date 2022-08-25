import { Box } from "@mui/system";
// import ComingSoon from "components/ComingSoon";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import SideNav from "views/broadcast/SideNav";

function BroadCast() {
  useTitle("Broadcast");

  return (
    <Box display="flex" alignItems="flex-start">
      <SideNav />
      <Box sx={{flex:1}}>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default BroadCast;
