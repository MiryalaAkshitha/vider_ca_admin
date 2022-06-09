import { Box } from "@mui/material";
import { useState } from "react";
import { userProfileMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";
import Expenditure from "views/settings/users/Expenditure";
import Profile from "views/settings/users/Profile";
import Tasks from "views/settings/users/Tasks";

function UserProfile() {
  const [active, setActive] = useState("Profile");

  return (
    <>
      <Box sx={{ position: "sticky", top: 45, bgcolor: "white", zIndex: 2 }}>
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
        {active === "Profile" && <Profile type="userProfile" />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
      </Box>
    </>
  );
}

export default UserProfile;
