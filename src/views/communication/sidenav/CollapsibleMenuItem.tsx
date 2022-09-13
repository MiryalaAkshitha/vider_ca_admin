import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { ListItemButton, Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { IMenuItem } from "data/settingsMenu";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CollapsibleMenuItem = ({ item }: any) => {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const hasPath = item?.children
      .map((item: any) => item?.path)
      .some((path: string) => location.pathname.includes(path));
    setOpen(hasPath);
  }, [item, location]);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)} selected={open}>
        <ListItemText
          primary={<Typography variant="body2">{item?.title}</Typography>}
        />
        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.children?.map((item: IMenuItem, index: number) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "initial" }}
            >
              <ListItemButton
                selected={location.pathname?.includes(item.path)}
                sx={{
                  paddingLeft: "30px",
                  ...(location.pathname?.includes(item.path) && {
                    borderRight: "3px solid red",
                    borderRadius: "2px",
                  }),
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="body2">{item?.title}</Typography>
                  }
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleMenuItem;
