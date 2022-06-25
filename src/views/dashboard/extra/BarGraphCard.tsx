import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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

const UserGraphCard = ({ data }) => {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState("userTasks");

  const barContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(barContainerRef.current?.clientWidth || 0);
  }, []);

  console.log(data?.userTasks);

  let result = data[active]?.map((item: any) => ({
    ...item,
    name: item.name.substr(0, 6),
    "Assigned Tasks": item?.assignedTasks,
    "Log Hours": item?.logHours,
  }));

  return (
    <>
      <Box
        mt={1}
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
            <BarChart layout="vertical" width={width - 20} data={result}>
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
export default UserGraphCard;
