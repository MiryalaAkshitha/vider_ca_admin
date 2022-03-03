import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import Nav from "views/storage/Nav";

function Storage() {
  return (
    <Box p={2}>
      <Nav />
      <Outlet />
    </Box>
  );
}

export default Storage;
