import { ArrowBack } from "@mui/icons-material";
import { AppBar, Breadcrumbs, Button, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate, useParams } from "react-router-dom";

function KybAppbar({ name, page }: any) {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <AppBar color="default" position="fixed">
      <Toolbar sx={{ background: "white" }}>
        <Button
          sx={{ minWidth: 0 }}
          onClick={() => navigate(`/clients/${params?.clientId}/kyb-info`)}
          startIcon={<ArrowBack />}
        ></Button>
        <Breadcrumbs>
          <Typography color="primary">KYB Info</Typography>
          <Typography>{name}</Typography>
          <Typography>{page}</Typography>
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}

export default KybAppbar;
