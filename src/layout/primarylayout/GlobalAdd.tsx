import { Add } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import useQueryParams from "hooks/useQueryParams";

type ElementType = HTMLElement | null;

interface AccountMenuProps {
  anchorEl: ElementType;
  setAnchorEl: (v: ElementType) => void;
}

const globalAddMenu = [
  {
    title: "Client",
    action: "createClient",
  },
  {
    title: "Task",
    action: "createTask",
  },
  {
    title: "Event",
    action: "createEvent",
  },
];

function GlobalAdd({ anchorEl, setAnchorEl }: AccountMenuProps) {
  const open = Boolean(anchorEl);
  const { queryParams, setQueryParams } = useQueryParams();

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
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {globalAddMenu.map((item, index) => (
        <div key={index}>
          <MenuItem
            sx={{ py: 1, m: 0 }}
            onClick={() => {
              setQueryParams({
                ...queryParams,
                [item.action]: "true",
              });
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
