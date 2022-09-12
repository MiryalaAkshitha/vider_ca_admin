import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { StyledTaskBox } from "../styles";

function TasksByFrequency({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const finalResult = [
    {
      name: "Recurring",
      value: data?.recurringTasksPercentage || 30,
      number: data?.recurringTasks || 0,
      fill: "#64B5F6",
      key: "recurring",
    },
    {
      name: "Non-Recurring",
      value: data?.nonRecurringTasksPercentage || 70,
      number: data?.nonRecurringTasks || 0,
      fill: "#0D47A1",
      key: "non_recurring",
    },
  ];

  const handleClick = (v: any) => {
    dispatch(handleSelected("taskType"));
    dispatch(
      handleFilters({
        checked: true,
        value: { label: v?.name, value: v.key },
      })
    );
    dispatch(handleApply());
    navigate("/task-board");
  };

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by type</Typography>
      </header>
      <main>
        <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
          <PieChart width={200} height={200}>
            <Pie
              data={finalResult}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              style={{ cursor: "pointer" }}
            >
              {finalResult?.map((entry, index) => (
                <Cell onClick={() => handleClick(entry)} key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                return (
                  <Box
                    sx={{
                      background: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Typography variant="h6">{payload?.[0]?.payload?.payload?.name}</Typography>
                    <Typography variant="body2">
                      {payload?.[0]?.payload?.payload?.number} tasks
                    </Typography>
                  </Box>
                );
              }}
              labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 13 }}
              cursor={{ fill: "transparent" }}
            />
          </PieChart>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#64B5F6",
                  }}
                ></Box>
                <Typography variant="caption">Recurring Tasks</Typography>
              </Box>
              <Typography variant="h5">{data?.recurringTasksPercentage}%</Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#0D47A1",
                  }}
                ></Box>
                <Typography variant="caption">One Time Tasks</Typography>
              </Box>
              <Typography variant="h5">{data?.nonRecurringTasksPercentage}%</Typography>
            </Box>
          </Box>
        </Box>
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

export default TasksByFrequency;
