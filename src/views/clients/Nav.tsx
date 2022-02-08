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
    <Box mb={4} display="flex" gap="15px" flexWrap="wrap" alignItems="center">
      <StyledClientFilterItem
        variant="body1"
        color="rgba(0,0,0,0.7)"
        active={location.pathname === "/clients"}
        onClick={() => handleClick("/clients")}
      >
        Clients
      </StyledClientFilterItem>
      <StyledClientFilterItem
        variant="body1"
        color="rgba(0,0,0,0.7)"
        active={location.pathname === "/leads"}
        onClick={() => handleClick("/leads")}
      >
        Leads
      </StyledClientFilterItem>
      <StyledClientFilterItem
        variant="body1"
        color="rgba(0,0,0,0.7)"
        active={location.pathname === "/dsc-register"}
        onClick={() => handleClick("/dsc-register")}
      >
        DSC Register
      </StyledClientFilterItem>
    </Box>
  );
}

export default Nav;
