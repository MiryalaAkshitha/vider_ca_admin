import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { getWeeklyLogHours } from "api/services/organization";
import Loader from "components/Loader";
import { format } from "date-fns";
import moment from "moment";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ResType } from "types";
import { StyledTaskBox } from "../styles";

export default function WeeklyLogHoursDigest() {
  const [startDate, setStartDate] = useState<null | Date | number>();
  const [endDate, setEndDate] = useState<null | Date | number>();

  const { data, isLoading }: ResType = useQuery(
    [
      "weekly-loghours",
      {
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
      },
    ],
    getWeeklyLogHours,
    { enabled: Boolean(startDate) && Boolean(endDate) }
  );

  useEffect(() => {
    let today = new Date();
    let weekAgo = today.getTime() - 1000 * 60 * 60 * 24 * 6;
    setEndDate(today);
    setStartDate(weekAgo);
  }, []);

  const dayChangeBack = (number: number, date: Date | number) => {
    let today = new Date(date);
    return today.getTime() - 1000 * 60 * 60 * 24 * number;
  };

  const dayChangeFront = (number: number, date: Date | number) => {
    let today = new Date(date);
    return today.getTime() + 1000 * 60 * 60 * 24 * number;
  };

  const totalHours = Object.keys(data?.data || {})
    ?.map((key) => data?.data[key])
    ?.reduce((a, b) => a + b, 0);

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Weekly Log Hours ({totalHours} Hours)</Typography>
        <Box sx={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {startDate && endDate ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  setStartDate(dayChangeBack(7, startDate));
                  setEndDate(dayChangeBack(7, endDate));
                }}
              >
                <ArrowLeftRoundedIcon />
              </IconButton>

              <Typography variant="body2">
                {format(new Date(startDate), "dd MMM, yyyy") +
                  " - " +
                  format(new Date(endDate), "dd MMM, yyyy")}
              </Typography>
              <IconButton
                disabled={
                  format(new Date(endDate), "dd-MM-yyyy") == format(new Date(), "dd-MM-yyyy")
                }
                sx={{ color: "black" }}
                onClick={() => {
                  setStartDate(dayChangeFront(7, startDate));
                  setEndDate(dayChangeFront(7, endDate));
                }}
              >
                <ArrowRightRoundedIcon />
              </IconButton>
            </Box>
          ) : null}
        </Box>
      </header>
      <main>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={
              Object.keys(data?.data || {})?.map((key) => ({
                name: key,
                Hours: data?.data[key],
              })) || []
            }
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64B5F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#64B5F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, "dataMax + 10"]} />
            <Tooltip
              labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
              cursor={{ fill: "transparent" }}
            />
            <Area
              type="monotone"
              dataKey="Hours"
              stroke="#64B5F6"
              fillOpacity={1}
              fill="url(#colorUv)"
              strokeWidth={8}
              dot={{ stroke: "#182F53", strokeWidth: "5px", r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </main>
    </StyledTaskBox>
  );
}
