import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { Outlet } from "react-router-dom";
import Nav from "views/storage/Nav";
import { useDispatch } from "react-redux";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useEffect } from "react";

function Storage() {
  useTitle("Storage");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  return (
    <Box p={2}>
      <Nav />
      <Outlet />
    </Box>
  );
}

export default Storage;
