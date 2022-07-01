import moment from "moment";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  startTime: number | null;
};

function Timer({ startTime }: Props) {
  const [state, setState] = useState<number | null>(null);

  useEffect(() => {
    setState(new Date().getTime() - startTime!);

    const handleTimer = setTimeout(() => {
      setState(new Date().getTime() - startTime!);
    }, 1000);

    return () => {
      clearTimeout(handleTimer);
    };
  }, [state, startTime]);

  const formatTime = () => {
    const hours = moment.duration(state).hours();
    const minutes = moment.duration(state).minutes();
    const seconds = moment.duration(state).seconds();
    const hoursStr = hours <= 9 ? "0" + hours : hours;
    const minutesStr = minutes <= 9 ? "0" + minutes : minutes;
    const secondsStr = seconds <= 9 ? "0" + seconds : seconds;
    return hoursStr + ":" + minutesStr + ":" + secondsStr;
  };

  return (
    <Typography variant="caption" color="primary">
      {formatTime()}
    </Typography>
  );
}

export default Timer;
