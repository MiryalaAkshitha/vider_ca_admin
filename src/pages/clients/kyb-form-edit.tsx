import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import FormBuilder from "pages/forms/FormBuilder";
import { useNavigate, useParams } from "react-router-dom";

function KybFormEdit() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Box pt={10}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Button
            onClick={() => navigate(`/clients/${params?.clientId}/kyb-info`)}
            startIcon={<ArrowBack />}
          >
            Kyb Info
          </Button>
        </Toolbar>
      </AppBar>
      <FormBuilder />
    </Box>
  );
}

export default KybFormEdit;
