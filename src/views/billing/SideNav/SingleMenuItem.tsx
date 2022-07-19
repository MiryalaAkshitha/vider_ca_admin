import { ListItemButton, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItemButton } from "layout/styles";
import { Link, useLocation } from "react-router-dom";

const SingleMenuItem = ({ item }: any) => {
  const location = useLocation();

  return (
    <Link to={item.path} style={{ textDecoration: "none", color: "initial" }}>
      <ListItemButton
        selected={location.pathname?.includes(item.path)}
        sx={{
          ...(location.pathname?.includes(item.path) && {
            borderRight: "3px solid red",
            borderRadius: "2px",
          }),
        }}
      >
        <ListItemText
          primary={<Typography variant="body2">{item?.title}</Typography>}
        />
      </ListItemButton>
    </Link>
  );
};

export default SingleMenuItem;
