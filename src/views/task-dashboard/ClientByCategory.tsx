import { Box, Grid } from "@mui/material";
import TaskBox from "../../components/task-dashboard/TaskBox";
import React from "react";
import HorizontalDoubleBars from "components/task-dashboard/HorizontalDoubleBars";

export default function ClientByCategory({
  name,
  noPadding,
}: {
  name?: string;
  noPadding?: boolean;
}) {
  return (
    <Box sx={{ margin: noPadding ? 0 : "20px 0" }}>
      <TaskBox title={name ? name : "Client by Category"}>
        <HorizontalDoubleBars
          data={[
            {
              name: "Individual",
              reacurring: 70,
              oneTime: 60,
              color: "#FF3465",
            },
            {
              name: "HUF",
              reacurring: 60,
              oneTime: 60,
              color: "#FFCF64",
            },
            {
              name: "Patnership Firm",
              reacurring: 45,
              oneTime: 60,
              color: "#00D9A6",
            },
            {
              name: "LLP",
              reacurring: 18,
              oneTime: 60,
              color: "#149ECD",
            },
            {
              name: "Company",
              reacurring: 39,
              oneTime: 60,
              color: "#88B053",
            },
            {
              name: "Trust",
              reacurring: 70,
              oneTime: 60,
              color: "#FF3465",
            },
            {
              name: "Society",
              reacurring: 60,
              oneTime: 60,
              color: "#FFCF64",
            },
            { name: "AOP", reacurring: 45, oneTime: 60, color: "#00D9A6" },
          ]}
        />
      </TaskBox>
    </Box>
  );
}
