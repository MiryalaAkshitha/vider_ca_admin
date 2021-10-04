import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Appbar({ title }: { title?: string }) {
  const theme = useTheme()
  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${theme.spacing(9)} + 1px)` },
        ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
      }}
      color="default" position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Appbar
