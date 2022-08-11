import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export default function TaskBox({
  title,
  children,
  footer,
  filter,
}: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  filter?: ReactNode;
}) {
  return (
    <Box
      sx={{
        border: "1px solid #0000001A",
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          borderRadius: "10px 10px 0 0",
          backgroundColor: "#0000001A",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        {filter ? filter : null}
      </Box>
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        {children}
      </Box>
      {footer ? (
        <Box
          sx={{
            borderRadius: "0 0 10px 10px",
            borderTop: "1px solid #0000001A",
            padding: "0 15px",
          }}
        >
          {footer}
        </Box>
      ) : null}
    </Box>
  );
}
