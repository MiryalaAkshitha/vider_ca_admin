import { Cell, Pie, Tooltip, PieChart } from "recharts";

const PieChartCard = ({ data }) => {
  return (
    <>
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          innerRadius={50}
          outerRadius={65}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index) => (
            <Cell key={`cell-${index}`} fill={entry?.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};
export default PieChartCard;
