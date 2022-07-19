import { Box, Typography } from "@mui/material";

const SectionHeading = ({ title }) => {
  return (
    <Box bgcolor="#F4F4F4" px={2} py={1}>
      <Typography variant="subtitle2" color="primary">
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeading;
