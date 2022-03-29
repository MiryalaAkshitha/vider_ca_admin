import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import RouterLink from "components/RouterLink";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { userProfileMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";

function ViewUser() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Box sx={{ position: "sticky", top: 65, bgcolor: "white", zIndex: 2 }}>
        <Box>
          <Button
            onClick={() => {
              navigate("/settings/users");
            }}
            startIcon={<ArrowBack />}
          >
            User Profile
          </Button>
        </Box>
        <StyledProfileNav sx={{ mt: 2, mx: -3 }}>
          {userProfileMenu.map((item, index) => (
            <RouterLink
              to={`/settings/users/${params.userId}${item.path}`}
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
    </>
  );
}

export default ViewUser;
