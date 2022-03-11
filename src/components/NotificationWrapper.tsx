import { API_KEY, messaging } from "api/firebase";
import { saveToken } from "api/services/notifications";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";

function useNotifications() {
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
  return null;
}

export default useNotifications;
