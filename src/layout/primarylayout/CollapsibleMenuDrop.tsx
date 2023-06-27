import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { IMenuItem } from "data/settingsMenu";
import { StyledListItemButton } from "layout/styles";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CollapsibleMenuDrop = ({ item }: any) => {
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
                    color="black"
                    primary={
                        <Typography variant="body2" color="black">
                            {item?.title}
                        </Typography>
                    }
                />
                {open ? (
                    <KeyboardArrowUp sx={{ color: "black" }} />
                ) : (
                    <KeyboardArrowDown sx={{ color: "black" }} />
                )}
            </StyledListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit className="zindex">
                <List component="div" disablePadding>
                    {item?.children?.map((item: IMenuItem, index: number) => (
                        <Link
                            key={index}
                            to={item.path}
                            style={{ textDecoration: "none", color: "black" }}
                        >
                            <StyledListItemButton
                                selected={item.path === location.pathname}
                                sx={{
                                    paddingLeft: "30px",
                                    opacity: location.pathname?.includes(item.path) ? 1 : 0.3,
                                    borderRight: location.pathname === (item.path) ? "3px solid red" : null,

                                    borderRadius: location.pathname?.includes(item.path) ? "2px" : null,
                                }}
                            >
                                <ListItemText
                                    color="black"
                                    primary={
                                        <Typography variant="body2" color="black">
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

export default CollapsibleMenuDrop;