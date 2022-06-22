import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { empty } from "assets";

interface EmptyPageProps {
  btnTitle?: string;
  btnAction?: () => void;
  btn2Title?: string;
  btn2Action?: () => void;
  minHeight?: string;
  title?: string;
  desc?: string;
  noImage?: boolean;
}

function EmptyPage(props: EmptyPageProps) {
  const {
    btnTitle,
    btnAction,
    minHeight = "80vh",
    title = "List is empty",
    desc = "",
    noImage = false,
    btn2Title,
    btn2Action,
  } = props;
  return (
    <Box
      sx={{
        display: "flex",
        minHeight,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box textAlign="center">
        {!noImage && <img src={empty} style={{ maxWidth: 300 }} alt="" />}
        <Typography mt={2} variant="subtitle2">
          {title}
        </Typography>
        <Typography mb={2} variant="body2">
          {desc}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1}>
          {btnTitle && (
            <Button variant="contained" color="secondary" onClick={btnAction}>
              {btnTitle}
            </Button>
          )}
          {btn2Title && (
            <Button variant="contained" color="secondary" onClick={btn2Action}>
              {btn2Title}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EmptyPage;
