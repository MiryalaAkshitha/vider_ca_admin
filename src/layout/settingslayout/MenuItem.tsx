import { Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { StyledListItemButton } from "layout/styles";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const MenuItem = ({ item }: any) => {
  const history = useHistory();
  return (
    <Link to={item.path} style={{ textDecoration: "none", color: "initial" }}>
      <StyledListItemButton
        selected={false}
        sx={{
          opacity: item.path === history.location.pathname ? 1 : 0.4,
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
  );
};

export default MenuItem;
