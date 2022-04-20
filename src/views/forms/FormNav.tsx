import { List, ListItemButton, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import RouterLink from "components/RouterLink";
import { useLocation } from "react-router-dom";

const formMenu = [
  {
    title: "My Forms",
    path: "",
    pathName: "/forms",
  },
  {
    title: "Standard forms",
    path: "standard-forms",
    pathName: "/forms/standard-forms",
  },
  {
    title: "Form Settings",
    path: "form-settings",
    pathName: "/forms/form-settings",
  },
];

const FormNav = () => {
  const location = useLocation();

  return (
    <List sx={{ width: "220px" }}>
      {formMenu.map((item: any, index: number) => (
        <RouterLink to={item.path} key={index}>
          <ListItemButton
            selected={item.pathName === location.pathname}
            sx={{
              color: (theme) =>
                item.pathName === location.pathname
                  ? theme.palette.primary.main
                  : "black",
            }}
          >
            <ListItemText
              primary={<Typography variant="body1">{item?.title}</Typography>}
            />
          </ListItemButton>
        </RouterLink>
      ))}
    </List>
  );
};

export default FormNav;
