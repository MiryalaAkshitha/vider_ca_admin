import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useAppSelector } from "redux/store";
import "./App.css";
import routes from "./routes";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import FullPageLoader from "components/FullPageLoader";
import ConfirmDialogProvider from "components/ConfirmDialogProvider";

const queryClient = new QueryClient();

function App() {
  const errorState: any = useAppSelector((state) => state.error);

  if (errorState.error) {
    return (
      <div>
        <h1>Error</h1>
        <div>
          <pre>{JSON.stringify(errorState, null, 4)}</pre>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmDialogProvider>
        <FullPageLoader>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={1500}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <BrowserRouter>
              <Switch>
                {routes.map((route, index) => {
                  if (route.routes) {
                    return (
                      <Route path={route.path} exact={route.exact} key={index}>
                        <route.component routes={route.routes} />
                      </Route>
                    );
                  }
                  return (
                    <Route
                      key={index}
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </BrowserRouter>
          </SnackbarProvider>
        </FullPageLoader>
      </ConfirmDialogProvider>
    </QueryClientProvider>
  );
}

export default App;
