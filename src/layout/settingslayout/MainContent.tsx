import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { Redirect, Route, Switch } from "react-router-dom";

function MainContent({ routes }: any) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: "250px",
      }}
    >
      <Toolbar />
      <Switch>
        {routes.map((item: any, index: number) => (
          <Route key={index} path={item.path} component={item.component} />
        ))}
        <Redirect exact path="/" to={routes[0]?.path} />
      </Switch>
    </Box>
  );
}

export default MainContent;
