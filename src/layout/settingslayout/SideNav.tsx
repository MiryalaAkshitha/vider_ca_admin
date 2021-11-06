import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { logo } from "assets";
import { useState } from "react";
import { DrawerHeader, SettingsDrawer } from "../styles";
import CollapsibleMenuItem from "./CollapsibleMenuItem";
import { menuItems } from "./menu";
import MenuItem from "./MenuItem";

function SideNav() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <SettingsDrawer
      variant="permanent"
      open={open}
      onMouseLeave={handleDrawerClose}
      onMouseOver={handleDrawerOpen}
    >
      <DrawerHeader>
        <img src={logo} alt="" />
        <Typography
          variant="subtitle1"
          sx={{ opacity: open ? 1 : 0, transition: "0.4s" }}
          pt={1}
          pl={1}
          color="white"
        >
          Vider
        </Typography>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => {
          return item?.children ? (
            <CollapsibleMenuItem key={index} item={item} />
          ) : (
            <MenuItem item={item} key={index} />
          );
        })}
      </List>
    </SettingsDrawer>
  );
}

export default SideNav;
