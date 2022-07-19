import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { IMenuItem } from "data/settingsMenu";
import { StyledListItemButton } from "layout/styles";
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
      <StyledListItemButton onClick={() => setOpen(!open)} selected={open}>
        <ListItemText
          color="white"
          primary={
            <Typography variant="body2" color="white">
              {item?.title}
            </Typography>
          }
        />
        {open ? (
          <KeyboardArrowUp sx={{ color: "white" }} />
        ) : (
          <KeyboardArrowDown sx={{ color: "white" }} />
        )}
      </StyledListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item?.children?.map((item: IMenuItem, index: number) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: "none", color: "initial" }}
            >
              <StyledListItemButton
                selected={false}
                sx={{
                  paddingLeft: "30px",
                  opacity: location.pathname?.includes(item.path) ? 1 : 0.4,
                }}
              >
                <ListItemText
                  color="white"
                  primary={
                    <Typography variant="body2" color="white">
                      {item?.title}
                    </Typography>
                  }
                />
              </StyledListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleMenuItem;
