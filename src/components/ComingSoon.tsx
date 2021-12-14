import { Box, Typography } from "@mui/material";

function ComingSoon({ title }: { title: string }) {
  return (
    <Box
      minHeight="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3" color="primary">
        {title}
      </Typography>
    </Box>
  );
}

export default ComingSoon;
