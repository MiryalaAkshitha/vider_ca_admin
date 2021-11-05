import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

function Timer({ startTime }: { startTime: number | null }) {
  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    setInterval(() => {
      setState(new Date().getTime() - startTime!);
    }, 1000);
  }, [startTime]);

  const formatTime = () => {
    let hours = moment.duration(state).hours();
    let minutes = moment.duration(state).minutes();
    let seconds = moment.duration(state).seconds();
    let hoursStr = hours <= 9 ? "0" + hours : hours;
    let minutesStr = minutes <= 9 ? "0" + minutes : minutes;
    let secondsStr = seconds <= 9 ? "0" + seconds : seconds;
    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  };

  return (
    <Typography variant="caption" color="primary">
      {formatTime()}
    </Typography>
  );
}

export default Timer;
