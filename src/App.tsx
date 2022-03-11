import AuthWrapper from "components/AuthWrapper";
import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import useNotifications from "components/NotificationWrapper";
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
  useNotifications();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfirmDialogProvider>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <AuthWrapper>
            <RoutesContainer />
          </AuthWrapper>
        </SnackbarProvider>
      </ConfirmDialogProvider>
    </QueryClientProvider>
  );
}

export default App;
