import { ArrowBack } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userProfileMenu } from "data/constants";
import { StyledProfileNav, StyledProfileNavItem } from "views/clients/styles";
import Expenditure from "views/settings/manage-users/users/Expenditure";
import Tasks from "views/settings/manage-users/users/Tasks";
import UserDetails from "views/settings/manage-users/users/UserDetails";
import LogHours from "views/settings/manage-users/users/LogHours";
import useQueryParams from "hooks/useQueryParams";

function ViewUser() {
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();

  const active = queryParams.tab;

  return (
    <>
      <Box p={1}>
        {/* <Button
          onClick={() => navigate("/settings/users")}
          startIcon={<ArrowBack />}
        >
          User Profile
        </Button> */}
      </Box>
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
        {active === "Profile" && <UserDetails />}
        {active === "Tasks" && <Tasks />}
        {active === "Expenditure" && <Expenditure />}
        {active === "Log Hours" && <LogHours />}
      </Box>
    </>
  );
}

export default ViewUser;
