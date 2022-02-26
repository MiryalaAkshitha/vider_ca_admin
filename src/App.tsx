import { API_KEY, messaging } from "api/firebase";
import { saveToken } from "api/services/notifications";
import ConfirmDialogProvider from "components/ConfirmDialogProvider";
import { getToken, onMessage } from "firebase/messaging";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
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
  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    (async () => {
      try {
        let permission = await Notification.requestPermission();
        if (permission === "granted") {
          let token = await getToken(messaging, {
            vapidKey: API_KEY,
          });
          await saveToken({ token });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload.notification);
    });
  }, []);

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
