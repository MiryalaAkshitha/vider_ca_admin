import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StyledTaskBox } from "../styles";

function TasksByPriority({ data }) {
  const navigate = useNavigate();

  const result = [
    { name: "Low", value: data?.tasksByPriority?.low, color: "#FF3465" },
    {
      name: "Medium",
      value: data?.tasksByPriority?.medium,
      color: "#f17f23",
    },
    {
      name: "High",
      value: data?.tasksByPriority?.high,
      color: "#019335",
    },
  ];

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by Priority</Typography>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={result} layout="vertical" style={{ padding: 0, fontSize: "12px" }}>
            <Bar dataKey="value" barSize={8} radius={[0, 4, 4, 0]}>
              {result?.map((entry: any, index: number) => (
                <Cell fill={result[index].color} />
              ))}
            </Bar>
            <YAxis type="category" dataKey="name" />
            <Tooltip
              labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 13 }}
              cursor={{ fill: "transparent" }}
            />
            <XAxis type="number" domain={[0, "dataMax + 10"]} />
          </BarChart>
        </ResponsiveContainer>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Tasks
        </Typography>
        <IconButton color="secondary" size="small" onClick={() => navigate("/task-board")}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default TasksByPriority;
