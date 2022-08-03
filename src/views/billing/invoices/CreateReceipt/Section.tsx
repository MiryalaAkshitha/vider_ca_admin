import { Box, Typography } from "@mui/material";

function Section({ title, children }) {
  return (
    <Box mt={3}>
      <Box sx={{ background: "#F4F4F4", px: 2, py: 1, mb: 2 }}>
        <Typography variant="body1" color="primary">
          {title}
        </Typography>
      </Box>
      <Box p={1}>{children}</Box>
    </Box>
  );
}

export default Section;
