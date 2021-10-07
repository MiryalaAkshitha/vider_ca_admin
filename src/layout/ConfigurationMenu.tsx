import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";

type ElementType = HTMLElement | null;

interface AccountMenuProps {
  anchorEl: ElementType;
  setAnchorEl: (v: ElementType) => void;
}

function ConfigurationMenu({ anchorEl, setAnchorEl }: AccountMenuProps) {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
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
        <Typography variant='body2'>Services</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Library</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Drafting</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Tools</Typography>
      </MenuItem>
      <Divider sx={{ mx: 1, my: 0 }} />
      <MenuItem sx={{ py: 1, m: 0 }}>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon color='primary' fontSize='small' />
        </ListItemIcon>
        <Typography variant='body2'>Notepad</Typography>
      </MenuItem>
    </Menu>
  );
}

export default ConfigurationMenu;
