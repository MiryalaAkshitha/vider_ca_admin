import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ActionsMenu = ({ actionsAnchorEl, setActionsAnchorEl }) => {
  const navigate = useNavigate()
  const handleClose = () => {
    setActionsAnchorEl(null);
  };
  const open = Boolean(actionsAnchorEl);

  const handleEditInvoice = () => {
    navigate("/invoicing/create-invoice")
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={actionsAnchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        top: "10px",
        left: "16px",
        ".MuiMenu-list": {
          padding: "0",
        },
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <MenuItem sx={{ py: 2, m: 0 }}>Generate Invoice</MenuItem>
      <MenuItem onClick={handleEditInvoice} sx={{ py: 2, m: 0 }}>Generate Receipt</MenuItem>
    </Menu>
  );
};

export default ActionsMenu;
