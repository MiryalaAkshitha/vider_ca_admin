import { Box } from "@mui/material";
import { userProfileMenu } from "data/constants";
import useQueryParams from "hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import Expenditure from "views/settings/profile/Expenditure";
import LogHours from "views/settings/profile/LogHours";
import Tasks from "views/settings/profile/Tasks";
import UserProfile from "views/settings/profile/UserProfile";

function Profile() {
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const active = queryParams.tab;

  return (
    <>
      <Box sx={{ position: "sticky", top: 65, bgcolor: "white", zIndex: 2 }}>
        <StyledProfileNav>
          {userProfileMenu.map((item, index) => (
            <StyledProfileNavItem
              key={index}
              onClick={() => navigate(`?tab=${item.title}`)}
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
        {active === "Log Hours" && <LogHours />}
      </Box>
    </>
  );
}

export default Profile;
