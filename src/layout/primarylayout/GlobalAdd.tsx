import { Add } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import { globalAddMenu } from "data/globalAddMenu";

type ElementType = HTMLElement | null;

interface AccountMenuProps {
  anchorEl: ElementType;
  setAnchorEl: (v: ElementType) => void;
  setGlobalActionType: (v: string) => void;
}

function GlobalAdd(props: AccountMenuProps) {
  const { anchorEl, setAnchorEl, setGlobalActionType } = props;
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (title: string) => {
    setGlobalActionType(title);
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
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {globalAddMenu.map((item, index) => (
        <div key={index}>
          <MenuItem
            sx={{ py: 1, m: 0 }}
            onClick={() => {
              handleClick(item.title);
            }}
          >
            <ListItemIcon>
              <Add color="secondary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{item.title}</Typography>
          </MenuItem>
          {globalAddMenu.length - 1 !== index && (
            <Divider sx={{ mx: 1, my: 0 }} />
          )}
        </div>
      ))}
    </Menu>
  );
}

export default GlobalAdd;
