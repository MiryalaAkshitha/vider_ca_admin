import { useNavigate } from "react-router-dom";
import BaseAppbar from "./BaseAppbar";
import { ArrowBack } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Button, IconButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { logo } from "assets";

function Appbar() {
  const navigate = useNavigate();

  return (
    <>
      <BaseAppbar occupy={true}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={3}>
            <img src={logo} alt="" />
            <Button
              onClick={() => navigate(-1)}
              color="primary"
              startIcon={<ArrowBack />}
            >
              Form Name
            </Button>
          </Box>
          <Box display="flex" gap={2}>
            <IconButton>
              <AccountCircleOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </BaseAppbar>
    </>
  );
}

export default Appbar;
