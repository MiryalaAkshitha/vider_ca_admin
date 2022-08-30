import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { atom_logo, logo } from "assets";
import { settingsMenu } from "data/settingsMenu";
import { useState } from "react";
import { DrawerHeader, SettingsDrawer } from "../styles";
import CollapsibleMenuItem from "./CollapsibleMenuItem";
import MenuItem from "./SingleMenuItem";

function SideNav() {
  return (
    <SettingsDrawer variant="permanent" open={true}>
      <DrawerHeader>
        <Box mx="-5px">
          <img style={{ width: 120 }} src={atom_logo} alt="" />
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        {settingsMenu.map((item, index) => {
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
