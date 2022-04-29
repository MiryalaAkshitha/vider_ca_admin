import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "ketan",
    pv: 50,
  },
  {
    name: "sample",
    pv: 5,
  },
  {
    name: "test",
    pv: 19,
  },
  {
    name: "Page D",
    pv: 45,
  },
  {
    name: "Page E",
    pv: 88,
  },
  {
    name: "Page F",
    pv: 70,
  },
];

const UserGraphCard = () => {
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(true);

  const barContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidth(barContainerRef.current?.clientWidth || 0);
  }, []);

  return (
    <>
      <Box mb={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle2">
          Tasks assigned and user graph
        </Typography>
        <Box>
          {active ? (
            <Button variant="outlined" color="secondary">
              Tasks
            </Button>
          ) : (
            <Button onClick={() => setActive(true)}>Tasks</Button>
          )}
          {active ? (
            <Button onClick={() => setActive(false)}>Log Hours</Button>
          ) : (
            <Button variant="outlined" color="secondary">
              Log Hours
            </Button>
          )}
        </Box>
      </Box>
      <Paper sx={{ minHeight: 10, width: "100%", p: 1 }} ref={barContainerRef}>
        <BarChart layout="vertical" width={width - 20} height={400} data={data}>
          <CartesianGrid stroke="#EBEBEB" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#B2F0FB" />
        </BarChart>
      </Paper>
    </>
  );
};
export default UserGraphCard;
