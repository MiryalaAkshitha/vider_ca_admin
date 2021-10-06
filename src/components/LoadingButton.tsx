import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  loadingColor?: string;
  title: string;
}

function LoadingButton(props: LoadingButtonProps) {
  const {
    loading,
    loadingColor = "white",
    title,
    variant = "contained",
    size = "medium",
    color = "primary",
    ...btnProps
  } = props;

  return (
    <Button {...btnProps} color={color} size={size} variant={variant}>
      {loading ? (
        <CircularProgress size={30} sx={{ color: loadingColor }} />
      ) : (
        title
      )}
    </Button>
  );
}

export default LoadingButton;
