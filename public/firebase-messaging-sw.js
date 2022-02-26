importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDcu4A12ZvBRGGWyvGtdTdaTEp6FIpeN2w",
  authDomain: "vider-3fc4d.firebaseapp.com",
  projectId: "vider-3fc4d",
  storageBucket: "vider-3fc4d.appspot.com",
  messagingSenderId: "762717377796",
  appId: "1:762717377796:web:08ce567ee6a39495bdac51",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
    icon: "PATH TO ICON IF ANY",
    data: { url: payload.data.onClick },
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
