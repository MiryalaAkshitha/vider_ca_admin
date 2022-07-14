import { ArrowBack } from "@mui/icons-material";
import { Avatar, Button, IconButton, LinearProgress } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { logo } from "assets";
import { useUserData } from "context/UserProfile";
import AccountMenu from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGlobal } from "redux/reducers/globalSlice";

function Appbar() {
  const { loading } = useSelector(selectGlobal);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useUserData();
  const navigate = useNavigate();

  return (
    <MuiAppBar color="default" position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={3}>
          <img src={logo} alt="" />
          <Button
            onClick={() => navigate("/")}
            color="primary"
            startIcon={<ArrowBack />}
          >
            Settings
          </Button>
        </Box>
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar src={data?.imageUrl} />
          </IconButton>
        </Box>
        <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
      </Toolbar>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </MuiAppBar>
  );
}

export default Appbar;
