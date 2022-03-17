import { ListItemButton, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    textAlign: "left",
    minHeight: "48px",
  },
}));
export const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minHeight: "auto",
    padding: "10px 0",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "capitalize",
    paddingLeft: "20px",
    width: "100%",
    opacity: "1",
  },
}));
export const StyledTab = styled(Tab)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minHeight: "auto",
    padding: "10px 0",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "capitalize",
    paddingLeft: "20px",
    width: "100%",
    flexDirection: "column",
    opacity: "1",
  },
}));

export const MenuItem = styled("div")(({ theme }) => ({
  display: "flex",
}));
