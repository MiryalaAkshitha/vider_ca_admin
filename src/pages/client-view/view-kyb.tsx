import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import RouterLink from "components/RouterLink";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";

function ViewKyb() {
  const params: any = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppBar sx={{ boxShadow: "none" }} color="transparent" position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
          }}
        >
          <Button
            onClick={() => navigate(`/clients/${params.clientId}/kyb-info`)}
            color="primary"
            startIcon={<ArrowBack />}
          >
            Kyb Details
          </Button>
        </Toolbar>
        <StyledProfileNav>
          {menu.map((item, index) => (
            <RouterLink to={item.path} key={index}>
              <StyledProfileNavItem
                active={location.pathname.includes(item.path) ? 1 : 0}
              >
                {item.title}
              </StyledProfileNavItem>
            </RouterLink>
          ))}
        </StyledProfileNav>
      </AppBar>
      <Box py={3}>
        <Outlet />
      </Box>
    </>
  );
}
export const menu: Array<{ title: string; path: string }> = [
  {
    title: "View form entry",
    path: "view",
  },
  {
    title: "Audit log",
    path: "audit-log",
  },
  {
    title: "Fill Details",
    path: "fill-details",
  },
  {
    title: "Edit form",
    path: "edit",
  },
];

export default ViewKyb;
