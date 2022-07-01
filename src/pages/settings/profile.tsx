import { Box } from "@mui/material";
import { useState } from "react";
import { userProfileMenu } from "utils/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import Expenditure from "views/settings/users/Expenditure";
import Tasks from "views/settings/users/Tasks";
import UserProfile from "views/settings/users/UserProfile";

function Profile() {
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
        {active === "Profile" && <UserProfile />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
      </Box>
    </>
  );
}

export default Profile;
