import { ContactPageOutlined, Logout } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectGlobal } from "redux/reducers/globalSlice";

type ElementType = HTMLElement | null;

export interface AccountMenuProps {
  anchorEl: ElementType;
  setAnchorEl: (v: ElementType) => void;
}

function AccountMenu({ anchorEl, setAnchorEl }: AccountMenuProps) {
  const { timerRunning } = useSelector(selectGlobal);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const logout = async () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/";
    };

    if (timerRunning) {
      let confirm = window.confirm(
        "Timer is running. Are you sure you want to logout?"
      );
      if (!confirm) return;
      logout();
    } else {
      logout();
    }
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
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        sx={{ py: 1, m: 0 }}
        onClick={() => {
          navigate("/settings/profile");
        }}
      >
        <ListItemIcon>
          <ContactPageOutlined color="primary" fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Profile</Typography>
      </MenuItem>
      <MenuItem sx={{ py: 1, m: 0 }} onClick={handleLogout}>
        <ListItemIcon>
          <Logout color="primary" fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Logout</Typography>
      </MenuItem>
    </Menu>
  );
}

export default AccountMenu;
