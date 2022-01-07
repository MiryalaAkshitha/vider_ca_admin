import CheckIcon from "@mui/icons-material/Check";
import { Box, Typography } from "@mui/material";

function DDItem({ index, data }: any) {
  return (
    <Box
      sx={{
        minWidth: 300,
        padding: "10px 10px 10px 10px",
        borderRadius: 3,
        border: "2px solid #0D47A11A",
      }}
    >
      <Box mt={1} display="flex" alignItems="center">
        <Box flex={1}>
          <Typography variant="caption" color="rgba(0,0,0,0.5)">
            Page {index + 1}
          </Typography>
          <Typography variant="body1" color="primary">
            {data?.name}
          </Typography>
        </Box>
        <CheckIcon fontSize="small" sx={{ color: "#89B152" }} />
      </Box>
    </Box>
  );
}

export default DDItem;
