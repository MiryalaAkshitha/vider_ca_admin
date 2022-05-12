import { toast } from "react-toastify";

const error = (msg: string) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
};

const success = (msg: string) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
  });
};

export const snack = { error, success };
