import { ListItemIcon, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItemButton } from "layout/styles";
import { Link, useLocation } from "react-router-dom";

const SingleMenuItem = ({ item }: any) => {
  const location = useLocation();

  return (
    <Link to={item.path} style={{ textDecoration: "none", color: "initial" }}>
      <StyledListItemButton
        selected={false}
        sx={{ opacity: item.path?.split("?")[0] === location.pathname ? 1 : 0.4 }}
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
      </StyledListItemButton>
    </Link>
  );
};

export default SingleMenuItem;
