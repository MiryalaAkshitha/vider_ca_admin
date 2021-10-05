import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useState } from 'react';
import AccountMenu from './AccountMenu';
import ConfigurationMenu from './ConfigurationMenu';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Appbar({ title }: { title?: string }) {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [configAnchorEl, setConfigAnchorEl] = useState<null | HTMLElement>(null);


  return (<>
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${theme.spacing(9)} + 1px)` },
        ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
      }}
      color="default" position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
        <Box display="flex" gap={2}>
          <IconButton onClick={(e) => setConfigAnchorEl(e.currentTarget)}>
            <MenuOutlinedIcon />
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <AccountCircleOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <AccountMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    <ConfigurationMenu anchorEl={configAnchorEl} setAnchorEl={setConfigAnchorEl} />
  </>
  )
}

export default Appbar
