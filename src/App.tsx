import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import FullPageLoader from "components/FullPageLoader";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppSelector } from "redux/store";
import "./App.css";
import RoutesContainer from "./RoutesContainer";
import routes from "./RoutesContainer";

const queryClient = new QueryClient();

function App() {
  const errorState: any = useAppSelector((state) => state.error);

  if (
    !localStorage.getItem("token") &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/signup"
  ) {
    window.location.href = "/login";
  }

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
            <RoutesContainer />
          </SnackbarProvider>
        </FullPageLoader>
      </ConfirmDialogProvider>
    </QueryClientProvider>
  );
}

export default App;
