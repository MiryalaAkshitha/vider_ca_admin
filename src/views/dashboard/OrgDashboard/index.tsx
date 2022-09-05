import { Box } from "@mui/material";
import ComingSoon from "components/ComingSoon";

function Dashboard() {
  // const { data, isLoading } = useQuery(["task-analytics"], getTaskAnalytics);

  // const { data: some, isLoading: someLoading } = useQuery(
  //   ["task-due-this-week"],
  //   getTasksDueThisWeek
  // );

  // const { data: ts, isLoading: tsLoading } = useQuery(["task-by-service"], getTasksByCategory);

  // const { data: tc, isLoading: tcLoading } = useQuery(["task-by-service"], getTasksByService);

  // const { data: ot, isLoading: otLoading } = useQuery(["over-due-tasks"], getOverdueTasks);

  // let grouped = _.groupBy(tasks, 'dueDate');

  // let sorted = Object.keys(grouped).sort((a, b) => {
  //   return moment(b).diff(moment(a));
  // });

  // if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <ComingSoon title="Dashboard" />
      {/* <TaskAnalytics />
      <ClientAnalytics />
      <LoghourAnalytics /> */}
    </Box>
  );
}

export default Dashboard;
