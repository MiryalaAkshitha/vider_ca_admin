import { Box, Typography } from "@mui/material";

const InvoiceHeadings = ({ title }) => {
  return (
    <Box bgcolor="#F4F4F4" p={2}>
      <Typography variant="subtitle2" color="primary">
        {title}
      </Typography>
    </Box>
  );
};

export default InvoiceHeadings;
