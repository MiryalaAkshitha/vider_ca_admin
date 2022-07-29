import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { theme } from "styles/theme";
import { Typography13 } from "../styles";

export default function TotalNoOfTasksInOrganization() {
  const [more, setMore] = useState(true);
  return (
    <Box
      sx={{
        padding: "0 35px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">130</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "6px",
          alignContent: "center",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            height: "46px",
            width: "46px",
            backgroundColor: more ? "rgba(	136, 176, 83,.1)" : "#FFD9E1",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          {more ? <NorthIcon color="success" /> : <SouthIcon color="error" />}
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: more ? "rgba(136, 176, 83)" : "#FFD9E1",
            }}
          >
            {more ? "+ " : "- "} 25%
          </Typography>
          <Typography13>Than Last Week</Typography13>
        </Box>
      </Box>
    </Box>
  );
}
