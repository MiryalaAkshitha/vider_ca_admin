import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const ColorTitleCard = ({ color, title }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box bgcolor={color} width={15} height={3}></Box>
        <Typography p={1} variant="body2">
          {title}
        </Typography>
      </Box>
    </>
  );
};
export default ColorTitleCard;
