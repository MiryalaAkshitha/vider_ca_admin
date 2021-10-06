import { Grid, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { icons } from "assets";
import { Link } from "react-router-dom";

const settingsMenu = [
  {
    title: "Categories",
    img: icons.profile,
  },
  {
    title: "Services",
    img: icons.man,
  },
  {
    title: "User Profile",
    img: icons.man,
  },
  {
    title: "Deleted Tasks and Clients",
    img: icons.profile,
  },
  {
    title: "Roles and Permissions",
    img: icons.man,
  },
];

const SettingsCard = styled("div")(() => ({
  border: "1px solid #07070729",
  padding: "30px 20px",
  minHeight: 130,
  display: "flex",
  gap: 25,
  borderRadius: "10px",
  alignItems: "center",
  cursor: "pointer",
}));

function Settings() {
  return (
    <Box>
      <Grid container spacing={2}>
        {settingsMenu.map((item, index) => (
          <Grid item xs={3} key={index}>
            <Link
              to='/categories'
              style={{ textDecoration: "none", color: "initial" }}>
              <SettingsCard>
                <img width={45} src={item.img} alt='' />
                <Box maxWidth={150}>
                  <Typography sx={{ lineHeight: "25px" }} variant='subtitle2'>
                    {item.title}
                  </Typography>
                </Box>
              </SettingsCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Settings;
