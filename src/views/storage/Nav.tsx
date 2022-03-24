import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledClientFilterItem } from "views/taskboard/Filters/style";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      mb={4}
      display="flex"
      gap="15px"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      <StyledClientFilterItem
        variant="body1"
        color="rgba(0,0,0,0.7)"
        active={location.pathname === "/storage/my-storage" ? 1 : 0}
        onClick={() => handleClick("/storage/my-storage")}
      >
        My Storage
      </StyledClientFilterItem>
      <StyledClientFilterItem
        variant="body1"
        color="rgba(0,0,0,0.7)"
        active={location.pathname === "/storage/all-clients-storage" ? 1 : 0}
        onClick={() => handleClick("/storage/all-clients-storage")}
      >
        All Clients
      </StyledClientFilterItem>
    </Box>
  );
}

export default Nav;
