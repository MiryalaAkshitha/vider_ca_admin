import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Typography, TypographyProps } from "@mui/material";
import { Box } from "@mui/system";
import { getTitle } from "utils";
import { PriorityEnum } from "utils/constants";

interface Props extends TypographyProps {
  text: PriorityEnum;
}

function PriorityText({ text, ...props }: Props) {
  return (
    <Box display="flex" gap={1} alignItems="center">
      {text === PriorityEnum.LOW ? (
        <ArrowDownwardIcon sx={{ fontSize: 15, color: "#FB0505", mt: "3px" }} />
      ) : (
        <ArrowUpwardIcon sx={{ fontSize: 15, color: "#88B151", mt: "3px" }} />
      )}
      <Typography
        {...props}
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        {getTitle(text)}
      </Typography>
    </Box>
  );
}

export default PriorityText;