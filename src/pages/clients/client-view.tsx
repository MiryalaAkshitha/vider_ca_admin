import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import RouterLink from "components/RouterLink";
import useTitle from "hooks/useTitle";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "utils/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";

function ClientProfile() {
  const params = useParams();
  const location = useLocation();

  useTitle("Clients");

  return (
    <div>
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
      <Outlet />
    </div>
  );
}

export default ClientProfile;
