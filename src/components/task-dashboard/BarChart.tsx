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

export default function BarChartReact({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        style={{ padding: 0, fontSize: "12px" }}
      >
        <Bar dataKey="value" barSize={8} radius={[0, 4, 4, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell fill={data[index].color} />
          ))}
        </Bar>
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
      </BarChart>
    </ResponsiveContainer>
  );
}
