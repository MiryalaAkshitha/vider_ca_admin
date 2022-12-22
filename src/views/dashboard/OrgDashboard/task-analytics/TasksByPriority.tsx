import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";
import { StyledTaskBox } from "../styles";

function TasksByPriority({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const result = [
    {
      name: "High",
      value: data?.tasksByPriority?.high,
      color: "#FB0505",
      key: "high",
    },
    {
      name: "Medium",
      value: data?.tasksByPriority?.medium,
      color: "#f17f23",
      key: "medium",
    },
    {
      name: "Low",
      value: data?.tasksByPriority?.low,
      color: "#019335",
      key: "low",
    },
    {
      name: "None",
      value: data?.tasksByPriority?.none,
      color: "#64B5F6",
      key: "none",
    },
  ];

  const handleClick = (v: any) => {
    dispatch(handleSelected("priority"));
    dispatch(
      handleFilters({
        checked: true,
        value: { label: getTitle(v.key), value: v.key },
      })
    );
    dispatch(handleApply());
    navigate("/task-board");
  };

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by Priority</Typography>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={result} layout="vertical" style={{ padding: 0, fontSize: "12px" }}>
            <Bar
              dataKey="value"
              barSize={8}
              radius={[0, 4, 4, 0]}
              onClick={(v) => handleClick(v)}
              style={{ cursor: "pointer" }}
            >
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
