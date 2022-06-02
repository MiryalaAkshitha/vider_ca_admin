import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTitle } from "utils";

const ColorTitleCard = ({ color, title }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 1,
        }}
      >
        <Box bgcolor={color} width={15} height={3}></Box>
        <Typography variant="body2">{getTitle(title)}</Typography>
      </Box>
    </>
  );
};
export default ColorTitleCard;
