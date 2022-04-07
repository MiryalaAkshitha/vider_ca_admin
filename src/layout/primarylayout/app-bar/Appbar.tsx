import {
  AddCircleOutlineRounded,
  LanguageOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectTitle } from "redux/reducers/globalSlice";
import AccountMenu from "../AccountMenu";
import ConfigurationMenu from "../ConfigurationMenu";
import GlobalAdd from "../GlobalAdd";
import Notifications from "../Notifications";
import BaseAppbar from "./BaseAppbar";

function Appbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [configAnchorEl, setConfigAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [globalAddAnchorEl, setGlobalAddAnchorEl] =
    useState<HTMLElement | null>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const title = useSelector(selectTitle);

  const createAnchors = () => (
    <>
      <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <ConfigurationMenu
        anchorEl={configAnchorEl}
        setAnchorEl={setConfigAnchorEl}
      />
      <GlobalAdd
        anchorEl={globalAddAnchorEl}
        setAnchorEl={setGlobalAddAnchorEl}
      />
      <Notifications
        notificationsAnchorEl={notificationsAnchorEl}
        setNotificationsAnchorEl={setNotificationsAnchorEl}
      />
    </>
  );

  return (
    <>
      <BaseAppbar
        sx={{
          width: { sm: `calc(100% - ${theme.spacing(9)} + 1px)`, height: 60 },
          ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
        }}
        color="default"
        position="fixed"
        anchors={createAnchors()}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton onClick={(e) => setConfigAnchorEl(e.currentTarget)}>
              <MenuOutlinedIcon color="primary" />
            </IconButton>
            <IconButton
              title="Global Add"
              onClick={(e) => setGlobalAddAnchorEl(e.currentTarget)}
            >
              <AddCircleOutlineRounded color="primary" />
            </IconButton>
            <IconButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                setNotificationsAnchorEl(e.currentTarget);
              }}
            >
              <LanguageOutlined color="primary" />
            </IconButton>
            <IconButton>
              <NotificationsOutlined color="primary" />
            </IconButton>
            <Link to="/settings/categories">
              <IconButton>
                <SettingsOutlinedIcon color="primary" />
              </IconButton>
            </Link>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <AccountCircleOutlinedIcon color="primary" />
            </IconButton>
          </Box>
        </Toolbar>
      </BaseAppbar>
    </>
  );
}

export default Appbar;
