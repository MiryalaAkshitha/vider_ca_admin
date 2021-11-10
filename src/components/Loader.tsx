import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

interface LoaderProps {
  minHeight?: string | number;
  color?: string;
}

function Loader(props: LoaderProps) {
  const { minHeight = 300, color = "primary.main" } = props;
  return (
    <Box
      sx={{
        minHeight,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ color }} />
    </Box>
  );
}

export default Loader;
