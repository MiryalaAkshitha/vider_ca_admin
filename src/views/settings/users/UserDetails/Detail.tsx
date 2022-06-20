import { Box, Typography } from "@mui/material";

const Detail = ({ title, value }) => {
  return (
    <Box mb={2}>
      <Typography variant="body2" color="rgba(0,0,0,0.5)">
        {title}
      </Typography>
      <Typography sx={{ wordBreak: "break-word" }} variant="body1">
        {value || "NA"}
      </Typography>
    </Box>
  );
};

export default Detail;
