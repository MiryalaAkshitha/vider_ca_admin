import { Typography } from "@mui/material";
import { API_KEY, messaging } from "api/firebase";
import { saveToken } from "api/services/notifications";
import { getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from "react-toastify";

function useNotifications() {
  const content = (title: string, body: string) => (
    <>
      <Typography variant="body1">{title}</Typography>
      <Typography variant="body2">{body}</Typography>
    </>
  );

  async function getPermission() {
    try {
      let permission = await Notification.requestPermission();
      if (permission !== "granted") return;
      let token = await getToken(messaging, {
        vapidKey: API_KEY,
      });
      await saveToken({ token });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    getPermission();
  }, []);

  useEffect(() => {
    onMessage(messaging, (payload: any) => {
      let { title, body } = payload.notification;
      toast.success(content(title, body), {
        position: "top-right",
      });
    });
  }, []);
  return null;
}

export default useNotifications;
