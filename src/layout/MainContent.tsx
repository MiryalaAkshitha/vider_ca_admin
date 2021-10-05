import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Dashboard from "pages/dashboard";
import { Redirect, Route, Switch } from "react-router-dom";

function MainContent({ routes }: any) {
  const theme = useTheme()
  return (
    <Box component="main" sx={{
      flexGrow: 1, p: 3,
      ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
    }}>
      <Toolbar />
      <Switch>
        {routes.map((item: any, index: number) => (
          <Route key={index} path={item.path} component={item.component} />
        ))}
        <Redirect exact path="/" to={routes[0]?.path} />
      </Switch>
    </Box>
  )
}

export default MainContent
