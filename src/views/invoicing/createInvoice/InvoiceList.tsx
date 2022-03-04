import React from "react";
import { Box, Typography } from "@mui/material";

const InvoiceList = ({ data }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          margin: "20px 0",
        }}
      >
        {data.map((data, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "space-between",

                  flex: 1,
                }}
              >
                {data.title} <span>:</span>
              </Typography>
              <Typography
                sx={{
                  flex: 2,
                  marginLeft: "20px",
                  fontWeight: "600",
                }}
              >
                {data.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default InvoiceList;
