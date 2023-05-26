import { Box, Breadcrumbs, Typography } from "@mui/material";
import { LinkRouter } from "components/BreadCrumbs";
import RouterLink from "components/RouterLink";
import ClientDataProvider, { ClientDataContext } from "context/ClientData";
import useTitle from "hooks/useTitle";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { clientMenu } from "data/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import { useDispatch } from "react-redux";
import { resetFilters } from "redux/reducers/taskboardSlice";
import { useEffect } from "react";

function ClientProfile() {
  useTitle("Clients");
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

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
