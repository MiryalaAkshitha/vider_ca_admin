import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";
import { colors } from "views/tasks/board/utils";
import { StyledTaskBox } from "../styles";

function TasksByStatus({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const statusResult = [
    {
      name: "To do",
      value: data?.tasksByStatus?.todo,
      color: colors[0],
      key: "todo",
    },
    {
      name: "In Progress",
      value: data?.tasksByStatus?.in_progress,
      color: colors[1],
      key: "in_progress",
    },
    {
      name: "On Hold",
      value: data?.tasksByStatus?.on_hold,
      color: colors[2],
      key: "on_hold",
    },
    {
      name: "Under Review",
      value: data?.tasksByStatus?.under_review,
      color: colors[3],
      key: "under_review",
    },
    {
      name: "Done",
      value: data?.tasksByStatus?.done,
      color: colors[4],
      key: "done",
    },
  ];

  const handleClick = (v: any) => {
    dispatch(handleSelected("status"));
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
        <Typography variant="h6">Tasks by status</Typography>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={statusResult} layout="vertical" style={{ padding: 0, fontSize: "12px" }}>
            <Bar
              dataKey="value"
              barSize={8}
              radius={[0, 4, 4, 0]}
              style={{ cursor: "pointer" }}
              onClick={(v) => handleClick(v)}
            >
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
