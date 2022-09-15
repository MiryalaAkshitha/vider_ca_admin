import { ArrowBack } from "@mui/icons-material";
import { Avatar, Button, IconButton, LinearProgress, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box, Tooltip } from "@mui/material";
import { UserProfileContext, useUserData } from "context/UserProfile";
import AccountMenu from "layout/primarylayout/AccountMenu";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGlobal } from "redux/reducers/globalSlice";
import { useFieldArray } from "react-hook-form";

function Appbar() {
  const { loading } = useSelector(selectGlobal);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useUserData();
  const navigate = useNavigate();
  const { data: uData } = useContext(UserProfileContext);

  return (
    <MuiAppBar sx={{ width: "calc(100% - 240px)", ml: "240px" }} color="default" position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={3}>
          <Button onClick={() => navigate("/")} color="primary" startIcon={<ArrowBack />}>
            Settings
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="#182F53">
              {uData?.fullName}
            </Typography>
            <Typography variant="caption" color="#182F53">
              {uData?.role?.name}
            </Typography>
          </Box>
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
