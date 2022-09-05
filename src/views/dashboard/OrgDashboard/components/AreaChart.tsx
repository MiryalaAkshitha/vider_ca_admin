import React from "react";
import { ResponsiveContainer, XAxis, YAxis, AreaChart, Area } from "recharts";

export default function AreaChartForOneLinearGradient({ data }: { data: any }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#64B5F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#64B5F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#64B5F6"
          fillOpacity={1}
          fill="url(#colorUv)"
          strokeWidth={8}
          dot={{ stroke: "#182F53", strokeWidth: "5px", r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
