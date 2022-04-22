import AuthWrapper from "components/AuthWrapper";
import ConfirmDialogProvider from "context/ConfirmDialog";
import useNotifications from "./NotificationWrapper";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import RoutesContainer from "./RoutesContainer";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";
import MenuPopoverProvider from "context/MenuPopover";

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <QueryClientProvider client={queryClient}>
        <ConfirmDialogProvider>
          <MenuPopoverProvider>
            <SnackbarProvider
              maxSnack={3}
              autoHideDuration={2000}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <AuthWrapper>
                <RoutesContainer />
              </AuthWrapper>
            </SnackbarProvider>
          </MenuPopoverProvider>
        </ConfirmDialogProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default App;
