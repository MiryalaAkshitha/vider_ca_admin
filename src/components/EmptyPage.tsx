import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { empty } from "assets";

interface EmptyPageProps {
  btnTitle?: string;
  btnAction?: () => void;
  minHeight?: string;
  title?: string;
  desc?: string;
}

function EmptyPage(props: EmptyPageProps) {
  const {
    btnTitle,
    btnAction,
    minHeight = "80vh",
    title = "List is empty",
    desc = "",
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
        <img src={empty} alt="" />
        <Typography mt={2} variant="subtitle2">
          {title}
        </Typography>
        <Typography mb={2} variant="body2">
          {desc}
        </Typography>
        {btnTitle && (
          <Button variant="contained" color="secondary" onClick={btnAction}>
            {btnTitle}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default EmptyPage;
