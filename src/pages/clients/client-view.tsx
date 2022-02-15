import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import RouterLink from "components/RouterLink";
import useTitle from "hooks/useTitle";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";

function ClientProfile() {
  const params = useParams();
  const location = useLocation();

  useTitle("Clients");

  return (
    <div>
      <Box sx={{ position: "sticky", top: 55, bgcolor: "white", zIndex: 2 }}>
        <Box p={2}>
          <BreadCrumbs page="clientProfile" />
        </Box>
        <StyledProfileNav>
          {clientMenu.map((item, index) => (
            <RouterLink
              to={`/clients/${params.clientId}${item.path}`}
              key={index}
            >
              <StyledProfileNavItem
                active={location.pathname.includes(item.path)}
              >
                {item.title}
              </StyledProfileNavItem>
            </RouterLink>
          ))}
        </StyledProfileNav>
      </Box>
      <Outlet />
    </div>
  );
}

export default ClientProfile;
