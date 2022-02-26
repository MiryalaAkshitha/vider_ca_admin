import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDcu4A12ZvBRGGWyvGtdTdaTEp6FIpeN2w",
  authDomain: "vider-3fc4d.firebaseapp.com",
  projectId: "vider-3fc4d",
  storageBucket: "vider-3fc4d.appspot.com",
  messagingSenderId: "762717377796",
  appId: "1:762717377796:web:08ce567ee6a39495bdac51",
};

export const API_KEY =
  "BAkRet3D3CPDYJPlfggI9dZ3tgRFxsHlAun5eyrNY-N3c_t4ZemfRzxCnsRaxC2dsfr7otEy6uT8v5mFe7wFQ18";

initializeApp(firebaseConfig);
export const messaging = getMessaging();
