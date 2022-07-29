import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

export default function PieChartTwoCircles({ data }: { data: any }) {
  return (
    <ResponsiveContainer width={200} height={200}>
      <RadialBarChart
        innerRadius="80%"
        outerRadius="200%"
        startAngle={360}
        endAngle={0}
        data={data}
      >
        {data.map((d: any, index: number) => {
          return (
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={index}
              tick={false}
            />
          );
        })}
        {data.map((d: any, index: number) => {
          return (
            <RadialBar
              background
              dataKey="value"
              angleAxisId={1}
              data={[data[index]]}
              maxBarSize={8}
              cornerRadius={5}
            />
          );
        })}
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
