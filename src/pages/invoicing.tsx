import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { useNavigate } from "react-router-dom";
import DashboardInvoice from "views/invoicing/dashboard/DashboardInvoice";

function Invoicing() {
  useTitle("Invoice");
  const navigate = useNavigate();

  return (
    <Box>
      <DashboardInvoice />
      <Fab
        onClick={() => navigate("/invoicing/create")}
        size="medium"
        color="secondary"
        sx={{
          position: "fixed",
          bottom: 40,
          right: 40,
          borderRadius: "8px",
        }}
        aria-label="add"
      >
        <Add />
      </Fab>
    </Box>
  );
}

export default Invoicing;
