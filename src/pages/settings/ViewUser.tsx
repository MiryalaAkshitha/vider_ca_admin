import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import RouterLink from "components/RouterLink";
import { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { userProfileMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";
import Expenditure from "views/settings/users/Expenditure";
import Profile from "views/settings/users/Profile";
import Tasks from "views/settings/users/Tasks";

function ViewUser() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Profile");

  return (
    <>
      <Box sx={{ position: "sticky", top: 45, bgcolor: "white", zIndex: 2 }}>
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
            <StyledProfileNavItem
              key={index}
              onClick={() => setActive(item.title)}
              active={active === item.title ? 1 : 0}
            >
              {item.title}
            </StyledProfileNavItem>
          ))}
        </StyledProfileNav>
        {active === "Profile" && <Profile />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
      </Box>
    </>
  );
}

export default ViewUser;
