import {
  AddCircleOutlineRounded,
  NotificationsOutlined,
} from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { AppBar, Avatar, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useUserData } from "context/UserProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTitle } from "redux/reducers/globalSlice";
import AddEvent from "views/calendar/AddEvent";
import AddClient from "views/clients/AddClient";
import AddMember from "views/settings/users/AddMember";
import CreateTask from "views/tasks/board/CreateTask";
import AccountMenu from "./AccountMenu";
import GlobalAdd from "./GlobalAdd";
import Notifications from "./Notifications";

type RefType = HTMLElement | null;

function Appbar() {
  const title = useSelector(selectTitle);
  const theme = useTheme();
  const { data } = useUserData();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [globalAddAnchorEl, setGlobalAddAnchorEl] = useState<RefType>(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState<RefType>(null);
  const [globalActionType, setGlobalActionType] = useState<string>("");

  return (
    <>
      <AppBar
        sx={{
          width: {
            sm: `calc(100% - ${theme.spacing(9)} + 1px)`,
            height: 60,
          },
          ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
        }}
        color="default"
        position="fixed"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box display="flex" gap={4} alignItems="center">
            <Box display="flex" gap={2}>
              <div>
                <IconButton
                  title="Global Add"
                  onClick={(e) => setGlobalAddAnchorEl(e.currentTarget)}
                >
                  <AddCircleOutlineRounded color="primary" />
                </IconButton>
              </div>
              <div>
                <IconButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    setNotifAnchorEl(e.currentTarget);
                  }}
                >
                  <NotificationsOutlined color="primary" />
                </IconButton>
              </div>
              <Link to="/settings">
                <IconButton>
                  <SettingsOutlinedIcon color="primary" />
                </IconButton>
              </Link>
            </Box>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar src={data?.imageUrl} />
            </IconButton>
          </Box>
        </Toolbar>
        <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        <Notifications
          anchorEl={notifAnchorEl}
          setAnchorEl={setNotifAnchorEl}
        />
        <GlobalAdd
          anchorEl={globalAddAnchorEl}
          setAnchorEl={setGlobalAddAnchorEl}
          setGlobalActionType={setGlobalActionType}
        />
        <AddClient
          open={globalActionType === "Client"}
          setOpen={() => {
            setGlobalActionType("");
          }}
        />
        <AddMember
          open={globalActionType === "Member"}
          setOpen={() => {
            setGlobalActionType("");
          }}
        />
        <CreateTask
          open={globalActionType === "Task"}
          setOpen={() => {
            setGlobalActionType("");
          }}
        />
        <AddEvent
          open={globalActionType === "Event"}
          setOpen={() => {
            setGlobalActionType("");
          }}
        />
      </AppBar>
    </>
  );
}

export default Appbar;
