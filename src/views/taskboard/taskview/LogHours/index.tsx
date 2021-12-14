import { Box, Button, Typography } from "@mui/material";
import { getLogHours } from "api/services/tasks";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResponseType } from "types";
import AddLogHour from "./AddLogHour";
import LogHoursList from "./LogHoursList";
import NoLogHours from "./NoLogHours";

function LogHours() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResponseType = useQuery(
    ["loghours", params.taskId],
    getLogHours
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Log Hours
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            variant="outlined"
          >
            Add Log Hour
          </Button>
        ) : null}
      </Box>
      <Box mt={4}>
        {data?.data?.length ? (
          <LogHoursList data={data?.data} />
        ) : (
          <NoLogHours action={() => setOpen(true)} />
        )}
      </Box>
      <AddLogHour open={open} setOpen={setOpen} />
    </>
  );
}

export default LogHours;
