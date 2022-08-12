import { Slide, toast } from "react-toastify";

const error = (msg: string) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
    transition: Slide,
  });
};

const success = (msg: string) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
    transition: Slide,
  });
};

export const snack = { error, success };
