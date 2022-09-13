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
        <Box>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  backgroundColor: "rgba(60,64,67,.90)",
                },
              },
            }}
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "160px",
                  height: "80px",
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" color="inherit">
                  {uData?.fullName}
                </Typography>
                <Typography color="lightgrey">{uData?.role?.name}</Typography>
              </Box>
            }
            placement="bottom-end"
            arrow
          >
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <Avatar src={data?.imageUrl} />
            </IconButton>
          </Tooltip>
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
