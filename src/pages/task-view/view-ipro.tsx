import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import RouterLink from "components/RouterLink";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";

function ViewIpro() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
        }}
        color="transparent"
        position="fixed"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "white",
          }}
        >
          <Button
            onClick={() => navigate(`/task-board/${params?.taskId}#iPro`)}
            color="primary"
            startIcon={<ArrowBack />}
          >
            Task details
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
      <Box mt={18}>
        <Outlet />
      </Box>
    </>
  );
}
export const menu: Array<{ title: string; path: string }> = [
  {
    title: "Edit form",
    path: "edit",
  },
  {
    title: "View form entry",
    path: "view",
  },
  {
    title: "Audit log",
    path: "audit-log",
  },
  {
    title: "Approvals",
    path: "approvals",
  },
];

export default ViewIpro;
