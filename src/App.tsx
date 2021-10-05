import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAppSelector } from 'redux/store';
import './App.css';
import routes from './routes';
import { SnackbarProvider } from 'notistack';

function App() {
  const errorState: any = useAppSelector(state => state.error)

  if (errorState.error) {
    return (
      <div>
        <h1>Error</h1>
        <div>
          <pre>
            {JSON.stringify(errorState, null, 4)}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="App">
      <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <BrowserRouter>
          <Switch>
            {routes.map((route, index) => {
              if (route.routes) {
                return (
                  <Route path={route.path} exact={route.exact} key={index}>
                    <route.component routes={route.routes} title={route.name} />
                  </Route>
                )
              }
              return (
                <Route
                  key={index}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              )
            })}
          </Switch>
        </BrowserRouter>
      </SnackbarProvider>
    </div>
  );
}

export default App;
