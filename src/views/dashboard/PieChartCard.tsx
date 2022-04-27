import { Cell, Pie, Tooltip, PieChart } from "recharts";

const data = [
  { name: "GSt", value: 400 },
  { name: "individual", value: 300 },
  { name: "Income Tax", value: 300 },
  { name: "MCA", value: 200 },
  { name: "others", value: 50 },
];

const COLORS = ["#88B151", "#F7964F", "#673AB7", "#64B5F6", "#C0FF8C"];

const PieChartCard = () => {
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};
export default PieChartCard;
