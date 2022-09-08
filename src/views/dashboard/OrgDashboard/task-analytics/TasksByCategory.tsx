import { Box, Typography } from "@mui/material";
import { getTasksByCategory } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";
import { StyledTaskBox } from "../styles";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function TasksByCategory() {
  const { data, isLoading }: ResType = useQuery(["task-by-category"], getTasksByCategory);

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Box display="flex" alignItems="center" gap={4}>
          <Typography variant="subtitle2" color="primary">
            Tasks by Category
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{ width: 10, height: 10, background: "#0D47A1", borderRadius: "50%" }}
            ></span>
            <Typography variant="caption">Recurring Tasks</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{ width: 10, height: 10, background: "#64B5F6", borderRadius: "50%" }}
            ></span>
            <Typography variant="caption">Recurring Tasks</Typography>
          </Box>
        </Box>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={
              data?.data?.map((item) => ({
                name: item.name,
                Recurring: item.recurring,
                "Non-Recurring": item.non_recurring,
              })) || []
            }
            style={{ padding: 0, fontSize: "12px" }}
          >
            <Bar dataKey="Recurring" barSize={6} radius={[4, 4, 0, 0]} fill="#0D47A1"></Bar>
            <Bar dataKey="Non-Recurring" barSize={6} radius={[4, 4, 0, 0]} fill="#64B5F6"></Bar>
            <XAxis type="category" dataKey="name" />
            <YAxis type="number" domain={[0, "dataMax + 25"]} />
            <Tooltip
              labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
              cursor={{ fill: "transparent" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </main>
    </StyledTaskBox>
  );
}

export default TasksByCategory;
