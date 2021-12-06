import { ArrowBack } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { logo } from "assets";
import { useNavigate } from "react-router-dom";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Appbar() {
  const navigate = useNavigate();

  return (
    <>
      <AppBar sx={{}} color="default" position="fixed">
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
          <Box display="flex" gap={2}>
            <IconButton>
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Appbar;
