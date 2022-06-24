import { Box, Button, Paper, Typography } from "@mui/material";
import { getOrganizationDashboard } from "api/services/organization";
import Loader from "components/Loader";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ResType } from "types";

const UserStats = () => {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState("userTasks");
  const barContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(barContainerRef.current?.clientWidth || 0);
  }, []);

  const { data, isLoading }: ResType = useQuery(
    ["org-dashboard-user-tasks", "USER_TASKS"],
    getOrganizationDashboard,
    { enabled: active === "userTasks" }
  );

  const { data: logHours, isLoading: logHoursLoading }: ResType = useQuery(
    ["org-dashboard-user-log-hours", "USER_LOG_HOURS"],
    getOrganizationDashboard,
    { enabled: active === "userLogHours" }
  );

  let result = data?.data?.map((item: any) => ({
    ...item,
    name: item.fullName.substr(0, 5),
    "Assigned Tasks": item?.count,
  }));

  const getResult = () => {
    if (active === "userTasks") {
      return data?.data?.map((item: any) => ({
        ...item,
        name: item.fullName.substr(0, 4),
        "Assigned Tasks": item?.count,
      }));
    } else {
      return logHours?.data?.map((item: any) => ({
        ...item,
        name: item.fullName.substr(0, 4),
        "Log Hours": Math.floor((item?.duration / (1000 * 60 * 60)) % 24),
      }));
    }
  };

  if (isLoading || logHoursLoading) return <Loader />;

  return (
    <>
      <Box
        mt={2}
        mb={1}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="subtitle2">
          Tasks assigned and user graph
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            onClick={() => setActive("userTasks")}
            variant={active === "userTasks" ? "outlined" : "text"}
            color="secondary"
          >
            Tasks
          </Button>
          <Button
            onClick={() => setActive("userLogHours")}
            variant={active === "userLogHours" ? "outlined" : "text"}
            color="secondary"
          >
            Log Hours
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{ minHeight: 200, width: "100%", p: 1, position: "relative" }}
        ref={barContainerRef}
      >
        {result?.length > 0 ? (
          <ResponsiveContainer
            width={"100%"}
            height={result?.length ? 100 * result.length : 300}
            debounce={50}
          >
            <BarChart layout="vertical" width={width - 20} data={getResult()}>
              <CartesianGrid stroke="#EBEBEB" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip
                labelStyle={{
                  color: "green",
                }}
                itemStyle={{
                  color: "red",
                }}
              />
              <Legend />
              <Bar
                dataKey={
                  active === "userTasks" ? "Assigned Tasks" : "Log Hours"
                }
                barSize={20}
                fill="#B2F0FB"
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Typography variant="subtitle2" color="grey">
              No Users.
            </Typography>
          </Box>
        )}
      </Paper>
    </>
  );
};
export default UserStats;
