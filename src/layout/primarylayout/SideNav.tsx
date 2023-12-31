import { Box, ListItemButton, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { atom_logo } from "assets";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, DrawerHeader } from "../styles";
import { menu } from "../../data/menu";
import CollapsibleMenuItem from "./CollapsibleMenuItem";
import MenuItem from "./SingleMenuItem";

function SideNav() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      onMouseLeave={handleDrawerClose}
      onMouseOver={handleDrawerOpen}
    >
      <DrawerHeader>
        <Box mx="-5px">
          <img style={{ width: 55 }} src={atom_logo} alt="" />
        </Box>
      </DrawerHeader>
      <Divider />
      <List>
        {menu.map((item, index) => {
          return item?.children ? (
            <CollapsibleMenuItem key={index} item={item} />
          ) : (
            <MenuItem item={item} key={index} />
          );
        })}
      </List>
      
      {/* <List>
        {menu.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            style={{ textDecoration: "none", color: "initial" }}
          >
            <ListItemButton
              selected={true}
              sx={{
                opacity: item.path === location.pathname ? 1 : 0.4,
                "&.Mui-selected": {
                  background: "rgba(0, 0, 0, 0.4)",
                },
                "&.Mui-selected:hover": {
                  background: "rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <img src={item.icon} width={15} alt="" />
              </ListItemIcon>
              <ListItemText
                color="white"
                primary={
                  <Typography variant="body2" color="white">
                    {item?.title}
                  </Typography>
                }
              />
            </ListItemButton>
          </Link>
        ))}
      </List> */}
    </Drawer>
  );
}

export default SideNav;
