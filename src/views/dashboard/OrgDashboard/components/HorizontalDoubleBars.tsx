import { Box } from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function HorizontalDoubleBars({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} style={{ padding: 0, fontSize: "12px" }}>
        <Bar
          dataKey="reacurring"
          barSize={6}
          radius={[4, 4, 0, 0]}
          fill="#0D47A1"
        ></Bar>
        <Bar
          dataKey="oneTime"
          barSize={6}
          radius={[4, 4, 0, 0]}
          fill="#64B5F6"
        ></Bar>
        <XAxis type="category" dataKey="name" />
        <YAxis type="number" />
      </BarChart>
    </ResponsiveContainer>
  );
}
