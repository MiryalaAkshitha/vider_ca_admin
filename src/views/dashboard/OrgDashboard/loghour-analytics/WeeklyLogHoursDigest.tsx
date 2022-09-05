import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AreaChartForOneLinearGradient from "../components/AreaChart";
import { StyledTaskBox } from "../styles";

export default function WeeklyLogHoursDigest() {
  const [startDate, setStartDate] = useState<null | Date | number>();
  const [endDate, setEndDate] = useState<null | Date | number>();

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

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Weekly Log Hours</Typography>
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
          <Button variant="outlined" color="secondary">
            Apply
          </Button>
        </Box>
      </header>
      <main>
        <AreaChartForOneLinearGradient
          data={[
            {
              name: "Page A",
              uv: 4000,
              pv: 2400,
              amt: 2400,
            },
            {
              name: "Page B",
              uv: 3000,
              pv: 1398,
              amt: 2210,
            },
            {
              name: "Page C",
              uv: 2000,
              pv: 9800,
              amt: 2290,
            },
            {
              name: "Page D",
              uv: 2780,
              pv: 3908,
              amt: 2000,
            },
            {
              name: "Page E",
              uv: 1890,
              pv: 4800,
              amt: 2181,
            },
            {
              name: "Page F",
              uv: 2390,
              pv: 3800,
              amt: 2500,
            },
            {
              name: "Page G",
              uv: 3490,
              pv: 4300,
              amt: 2100,
            },
          ]}
        />
      </main>
    </StyledTaskBox>
  );
}
