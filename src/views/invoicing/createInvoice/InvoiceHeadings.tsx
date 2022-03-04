import { Typography } from "@mui/material";
import React from "react";

const InvoiceHeadings = ({ title }) => {
  return (
    <>
      <Typography
        component="div"
        sx={{
          color: "#0D47A1",
          backgroundColor: "#F4F4F4",
          padding: "15px 20px",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
    </>
  );
};

export default InvoiceHeadings;
