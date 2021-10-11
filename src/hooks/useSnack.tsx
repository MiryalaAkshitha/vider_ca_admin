import { useSnackbar } from "notistack";

function useSnack() {
  const { enqueueSnackbar } = useSnackbar();
  const error = (msg: string) => enqueueSnackbar(msg, { variant: "error" });
  const success = (msg: string) => enqueueSnackbar(msg, { variant: "success" });

  return { error, success };
}

export default useSnack;
