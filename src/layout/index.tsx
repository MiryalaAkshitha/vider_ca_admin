import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { withRouter } from 'react-router';
import { LayoutProps } from "types";
import Appbar from './Appbar';
import MainContent from './MainContent';
import SideNav from './SideNav';

function Layout(props: LayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar title={props.title} />
      <SideNav />
      <MainContent routes={props.routes} />
    </Box>
  );
}

export default withRouter(Layout)