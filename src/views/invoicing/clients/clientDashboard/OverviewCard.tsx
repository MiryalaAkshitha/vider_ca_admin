import { Box, Divider, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const CardComponent = ({ title, value }) => {
  return (
    <>

      <Box p={2}>
        <Typography mb={1} variant="caption" component="div">{title}</Typography>
        <Divider />
        <Typography mt={1} variant="subtitle1" component="div">{value}</Typography>

      </Box>

    </>
  );
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartCard = ({ data, colors, width, height, cx, cy }) => {
  return (
    <Box>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={cx}
          cy={cy}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </Box>
  );
}



const BarChatCard = ({ data, barInfo, width, height }) => {
  return (
    <ResponsiveContainer width={width} aspect={height}>
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 20,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {barInfo.map((item: any) => {

          return (<Bar dataKey={item.name} fill={item.color} />);

        })}
      </BarChart>
    </ResponsiveContainer>
  );
}

export { BarChatCard, CardComponent, PieChartCard }