import { Box, Typography } from "@mui/material";
import PieChartTwoCircles from "components/task-dashboard/PieChartTwoCircles";
import React from "react";
import { Typography13 } from "../styles";

export default function TasksByFrequency() {
  return (
    <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
      <PieChartTwoCircles
        data={[
          { value: 30, fill: "#64B5F6" },
          { value: 70, fill: "#0D47A1" },
        ]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        <Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Box
              sx={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#0D47A1",
              }}
            ></Box>
            <Typography13>Recurring Tasks</Typography13>
          </Box>
          <Typography variant="h5">70%</Typography>
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Box
              sx={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#64B5F6",
              }}
            ></Box>
            <Typography13>One Time Tasks</Typography13>
          </Box>
          <Typography variant="h5">30%</Typography>
        </Box>
      </Box>
    </Box>
  );
}
