import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
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
  if (
    !localStorage.getItem("token") &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/signup"
  ) {
    window.location.href = "/login";
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
