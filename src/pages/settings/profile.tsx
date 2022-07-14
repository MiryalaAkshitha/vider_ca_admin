import { Box } from "@mui/material";
import { useState } from "react";
import { userProfileMenu } from "data/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import Expenditure from "views/settings/manage-users/users/Expenditure";
import Tasks from "views/settings/manage-users/users/Tasks";
import UserProfile from "views/settings/manage-users/users/UserProfile";

function Profile() {
  const [active, setActive] = useState("Profile");

  return (
    <>
      <Box sx={{ position: "sticky", top: 65, bgcolor: "white", zIndex: 2 }}>
        <StyledProfileNav>
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
      </Box>
      <Box px={2} py={3}>
        {active === "Profile" && <UserProfile />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
      </Box>
    </>
  );
}

export default Profile;
