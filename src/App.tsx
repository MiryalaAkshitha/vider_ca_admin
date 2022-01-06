import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAppSelector } from "redux/store";
import "./App.css";
import RoutesContainer from "./RoutesContainer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <RoutesContainer />
        </SnackbarProvider>
      </ConfirmDialogProvider>
    </QueryClientProvider>
  );
}

export default App;
