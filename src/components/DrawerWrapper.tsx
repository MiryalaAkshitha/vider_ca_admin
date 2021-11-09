import { Close } from "@mui/icons-material";
import { AppBar, Drawer, IconButton, Toolbar, Typography } from "@mui/material";

interface IDrawerWrapperProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

function DrawerWrapper(props: IDrawerWrapperProps) {
  const { open, setOpen, title, children } = props;

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">{title}</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      {children}
    </Drawer>
  );
}

export default DrawerWrapper;
