import RouterLink from "components/RouterLink";
import { Outlet, useLocation } from "react-router-dom";
import { invoicingClientsMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem
} from "views/clients/clients/styles";
import { Box } from "@mui/material";


const Clients = () => {
  const location = useLocation();


  return (
    <Box>
      <Box sx={{ position: "sticky", top: 50, left: 520, bgcolor: "white", zIndex: 2 }}>

        <StyledProfileNav>
          {invoicingClientsMenu.map((item, index) => (
            <RouterLink
              to={`/invoicing/clients/id${item.path}`}
              key={index}
            >
              <StyledProfileNavItem
                active={location.pathname.includes(item.path) ? 1 : 0}
              >
                {item.title}
              </StyledProfileNavItem>
            </RouterLink>
          ))}
        </StyledProfileNav>
      </Box>

      <Outlet />

    </Box>
  );
};
export default Clients;
