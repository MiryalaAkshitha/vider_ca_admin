import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { StyledTaskBox } from "../styles";

function TasksByFrequency({ data }) {
  const navigate = useNavigate();

  const finalResult = [
    { value: data?.recurringTasksPercentage, fill: "#64B5F6" },
    { value: data?.nonRecurringTasksPercentage, fill: "#0D47A1" },
  ];

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by frequency</Typography>
      </header>
      <main>
        <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
          <ResponsiveContainer width={200} height={200}>
            <RadialBarChart
              innerRadius="80%"
              outerRadius="200%"
              startAngle={360}
              endAngle={0}
              data={finalResult}
            >
              {finalResult.map((d: any, index: number) => {
                return (
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={index}
                    tick={false}
                  />
                );
              })}
              {finalResult.map((d: any, index: number) => {
                return (
                  <RadialBar
                    background
                    dataKey="value"
                    angleAxisId={1}
                    data={[finalResult[index]]}
                    maxBarSize={8}
                    cornerRadius={5}
                  />
                );
              })}
            </RadialBarChart>
          </ResponsiveContainer>
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
                    backgroundColor: "#0D47A1",
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
                    backgroundColor: "#64B5F6",
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
