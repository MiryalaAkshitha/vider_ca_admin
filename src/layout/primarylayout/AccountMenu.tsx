import { Logout } from "@mui/icons-material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";

type ElementType = HTMLElement | null;

export interface AccountMenuProps {
  anchorEl: ElementType;
  setAnchorEl: (v: ElementType) => void;
}

function AccountMenu({ anchorEl, setAnchorEl }: AccountMenuProps) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          minWidth: 200,
          minHeight: 150,
          py: 1,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <PermIdentityOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>My Profile</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Help/Support</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }} onClick={handleLogout}>
        <ListItemIcon>
          <Logout color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Logout</Typography>
      </MenuItem>
    </Menu>
  );
}

export default AccountMenu;