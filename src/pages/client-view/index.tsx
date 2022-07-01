import { Box, Breadcrumbs, Typography } from "@mui/material";
import { LinkRouter } from "components/BreadCrumbs";
import RouterLink from "components/RouterLink";
import ClientDataProvider, { ClientDataContext } from "context/ClientData";
import useTitle from "hooks/useTitle";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "utils/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";

function ClientProfile() {
  useTitle("Clients");
  const params = useParams();
  const location = useLocation();

  return (
    <ClientDataProvider>
      <Box sx={{ position: "sticky", top: 55, bgcolor: "white", zIndex: 2 }}>
        <ClientDataContext.Consumer>
          {({ data }) => (
            <Box p={2}>
              <Breadcrumbs>
                <LinkRouter underline="hover" color="inherit" to="/clients">
                  Clients
                </LinkRouter>
                <Typography>
                  {data?.data?.displayName} - {data?.data?.clientId}
                </Typography>
              </Breadcrumbs>
            </Box>
          )}
        </ClientDataContext.Consumer>
        <StyledProfileNav>
          {clientMenu.map((item, index) => (
            <RouterLink
              to={`/clients/${params.clientId}${item.path}`}
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
    </ClientDataProvider>
  );
}

export default ClientProfile;
