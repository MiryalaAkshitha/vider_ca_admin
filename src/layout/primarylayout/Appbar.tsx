import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import AccountMenu from "./AccountMenu";
import ConfigurationMenu from "./ConfigurationMenu";
import { useSelector } from "react-redux";
import { selectTitle } from "redux/reducers/globalSlice";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import {
  AddCircleOutlineRounded,
  LanguageOutlined,
  NotificationsOutlined,
} from "@mui/icons-material";
import GlobalCreateModal from "./GlobalCreateModal";
import AddCreateTask from "./AddCreateTask";
import Notifications from "./Notifications";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Appbar() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [configAnchorEl, setConfigAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [openGlobalDialog, setOpenGlobalDialog] = useState<boolean>(false);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const title = useSelector(selectTitle);

  return (
    <>
      <AppBar
        sx={{
          width: { sm: `calc(100% - ${theme.spacing(9)} + 1px)`, height: 60 },
          ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
        }}
        color="default"
        position="fixed"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton onClick={(e) => setConfigAnchorEl(e.currentTarget)}>
              <MenuOutlinedIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => setOpenGlobalDialog(true)}>
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
      </AppBar>
      <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      <ConfigurationMenu
        anchorEl={configAnchorEl}
        setAnchorEl={setConfigAnchorEl}
      />
      <GlobalCreateModal open={openGlobalDialog} setOpen={setOpenGlobalDialog}>
        <AddCreateTask setOpen={setOpenGlobalDialog} />
      </GlobalCreateModal>
      <Notifications
        notificationsAnchorEl={notificationsAnchorEl}
        setNotificationsAnchorEl={setNotificationsAnchorEl}
      />
    </>
  );
}

export default Appbar;
