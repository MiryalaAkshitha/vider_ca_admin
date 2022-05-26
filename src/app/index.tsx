import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AuthWrapper from "components/AuthWrapper";
import ConfirmDialogProvider from "context/ConfirmDialog";
import MenuPopoverProvider from "context/MenuPopover";
import PermissionsProvider from "context/PermissionsProvider";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";
import "./App.css";
import useNotifications from "./NotificationWrapper";
import RoutesContainer from "./RoutesContainer";

export let socket;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  useNotifications();

  useEffect(() => {
    socket = io(`http://localhost:5000`);
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <ConfirmDialogProvider>
            <MenuPopoverProvider>
              <AuthWrapper>
                <PermissionsProvider>
                  <RoutesContainer />
                </PermissionsProvider>
              </AuthWrapper>
            </MenuPopoverProvider>
          </ConfirmDialogProvider>
        </QueryClientProvider>
      </LocalizationProvider>
      <ToastContainer />
    </>
  );
}

export default App;
