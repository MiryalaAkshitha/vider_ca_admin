import { Box } from "@mui/system";
import { Grid, Typography, Paper } from "@mui/material";
import { getTitle } from "utils";
import { COLORS } from "utils/constants";
import { getOrganizationDashboard } from "api/services/organization";
import { ResType } from "types";
import { useQuery } from "react-query";
import Loader from "components/Loader";
import ColorTitleCard from "./ColorTitleCrad";
import PieChartCard from "./PieChartCard";

function TaskCategories() {
  const { data, isLoading }: ResType = useQuery(
    ["org-dashboard-task-numericals", "TASK_NUMERALS"],
    getOrganizationDashboard
  );

  if (isLoading) return <Loader />;

  return (
    <Paper
      sx={{
        padding: "25px",
        display: "flex",
        gap: 2,
      }}
    >
      <Box>
        <PieChartCard
          data={data?.data?.map((item: any, index: number) => ({
            name: getTitle(item?.category),
            value: +item?.count,
            color: COLORS[index],
          }))}
        />
      </Box>
      <Box flex={1}>
        <Typography variant="subtitle2">Task Numericals</Typography>
        <Grid container>
          {data?.data?.map((item: any, index: number) => (
            <Grid item xs={6} key={index}>
              <ColorTitleCard color={COLORS[index]} title={item?.category} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
}

export default TaskCategories;
