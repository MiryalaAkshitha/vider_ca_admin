import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StyledTaskBox } from "../styles";

function TasksByStatus({ data }) {
  const navigate = useNavigate();

  const statusResult = [
    { name: "To do", value: data?.tasksByStatus?.todo, color: "#FF3465" },
    {
      name: "In Progress",
      value: data?.tasksByStatus?.in_progress,
      color: "#FFCF64",
    },
    {
      name: "On-Hold",
      value: data?.tasksByStatus?.on_hold,
      color: "#00D9A6",
    },
    {
      name: "Under Review",
      value: data?.tasksByStatus?.under_review,
      color: "#149ECD",
    },
    { name: "Done", value: data?.tasksByStatus?.done, color: "#88B053" },
  ];

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by status</Typography>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={statusResult} layout="vertical" style={{ padding: 0, fontSize: "12px" }}>
            <Bar dataKey="value" barSize={8} radius={[0, 4, 4, 0]}>
              {statusResult?.map((entry: any, index: number) => (
                <Cell fill={statusResult[index].color} />
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

export default TasksByStatus;
