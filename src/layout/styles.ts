import { CSSObject, styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { ListItemButton, Tab, Tabs } from "@mui/material";

const drawerWidth = 240;

export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  background: theme.palette.primary.main,
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  background: theme.palette.primary.main,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  background: theme.palette.common.black,
  ...theme.mixins.toolbar,
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  position: "fixed",
  boxSizing: "border-box",
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const SettingsDrawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  position: "fixed",
  boxSizing: "border-box",
  "& .MuiDrawer-paper": {
    background: theme.palette.primary.main,
    width: drawerWidth,
  },
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  opacity: 0.4,
  "&.Mui-selected": {
    background: "rgba(0, 0, 0, 0.4)",
  },
  "&.Mui-selected:hover": {
    background: "rgba(0, 0, 0, 0.4)",
  },
}));

export const StyledAddCreateTaskTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

export const StyledAddCreateTaskTab = styled(Tab)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    fontFamily: "muli_regular",
    textTransform: "capitalize",
    textAlign: "left",
    paddingLeft: "30px",
    borderBottom: "1px solid lightgray",
    alignItems: "start",
    fontSize: "16px",
    color: theme.palette.primary.main,
  },
  "&.Mui-selected": {
    backgroundColor: "#FFF4F4",
  },
}));

export const StyledNotificationsTabs = styled(Tab)(({ theme }) => ({
  "&.MuiBox-root": {
    padding: "0px",
  },
  "&.MuiButtonBase-root": {
    fontFamily: "muli_regular",
    textTransform: "capitalize",
    textAlign: "center",
    borderBottom: "1px solid lightgray",
    alignItems: "center",
    padding: "0 14px",
    fontSize: "16px",
    minWidth: "auto",
    color: theme.palette.primary.main,
  },
  "&.MuiTabs-root": {
    backgroundColor: "red",
  },
  "&.Mui-selected": {
    borderBottom: "1px solid theme.palette.primary.main",
    backgroundColor: "none",
  },
}));

export const StyledBottomAppbar = styled("div")(() => ({
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "white",
  boxShadow: "0px -1px 3px rgba(0, 0, 0, 0.1)",
  display: "flex",
  padding: "10px 0px",
  paddingLeft: 100,
  gap: 20,
  zIndex: 10,
}));
