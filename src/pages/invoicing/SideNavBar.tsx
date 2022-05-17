import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardInvoice from "views/invoicing/dashboard/DashboardInvoice";
import SideNav from "views/invoicing/SideNav";

function SideNavBar() {
  useTitle("Invoice");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewReceipt = () => { };

  const handleNewEstimate = () => {
    navigate("/invoicing/create-estimate");
  };

  const handleNewInvoice = () => {
    navigate("/invoicing/create-invoice");
  };



  return (

    <Box display="flex" alignItems="flex-start">
      <SideNav />
      <Box flex={1}>
        <Outlet />
      </Box>


      {/* <Fab
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
    </Box> */}
    </Box>
  );
}

export default SideNavBar;
