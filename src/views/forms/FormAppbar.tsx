import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, LinearProgress, Toolbar } from "@mui/material";
import { logo } from "assets";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGlobal } from "redux/reducers/globalSlice";

function FormAppbar() {
  const { loading } = useSelector(selectGlobal);
  const navigate = useNavigate();

  return (
    <AppBar color="default" position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={3}>
          <img src={logo} alt="" />
          <Button
            onClick={() => navigate(-1)}
            color="primary"
            startIcon={<ArrowBack />}
          >
            Form Details
          </Button>
        </Box>
      </Toolbar>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}

export default FormAppbar;
