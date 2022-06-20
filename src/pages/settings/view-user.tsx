import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userProfileMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";
import Expenditure from "views/settings/users/Expenditure";
import Tasks from "views/settings/users/Tasks";
import UserDetails from "views/settings/users/UserDetails";

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
        {active === "Profile" && <UserDetails />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
      </Box>
    </>
  );
}

export default ViewUser;
