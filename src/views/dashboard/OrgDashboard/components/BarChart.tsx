import { Bar, BarChart as RBarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

function BarChart({ data, height = 200 }: { data: any; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RBarChart data={data} layout="vertical" style={{ padding: 0, fontSize: "12px" }}>
        <Bar dataKey="value" barSize={8} radius={[0, 4, 4, 0]}>
          {data.map((entry: any, index: number) => (
            <Cell fill={data[index].color} />
          ))}
        </Bar>
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
      </RBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;
