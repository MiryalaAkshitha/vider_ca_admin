import { Box, Typography } from "@mui/material";

function EventIndication({ title, color, onClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <span
        style={{
          background: color,
          width: 10,
          height: 10,
          borderRadius: "50%",          
        }}
      ></span>
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
}

export default EventIndication;
