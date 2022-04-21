import AddIcon from "@mui/icons-material/Add";
import { Fab, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardInvoice from "views/invoicing/dashboard/DashboardInvoice";

function Invoicing() {
  useTitle("Invoice");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewReceipt = () => {};

  const handleNewEstimate = () => {};

  const handleNewInvoice = () => {
    navigate("/invoicing/create-invoice");
  };

  return (
    <Box>
      <DashboardInvoice />

      <Fab
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
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
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleNewReceipt}>+ New Receipt</MenuItem>
        <MenuItem onClick={handleNewInvoice}>+ New Invoice</MenuItem>
        <MenuItem onClick={handleNewEstimate}>+ New Estimate</MenuItem>
      </Menu>
    </Box>
  );
}

export default Invoicing;
