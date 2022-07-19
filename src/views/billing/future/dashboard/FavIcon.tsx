import AddIcon from "@mui/icons-material/Add";
import { Fab, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FavIcon() {
  useTitle("Invoice");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewEstimate = () => {
    navigate("/invoicing/create-estimate");
  };

  const handleNewInvoice = () => {
    navigate("/invoicing/create-invoice");
  };

  const handleNewReceipt = () => {
    navigate("/invoicing/create-receipt");
  };

  return (
    <Box>

      <Fab
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
        size="medium"
        color="secondary"
        sx={{
          position: "fixed",
          bottom: 50,
          right: 50,
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

export default FavIcon;