import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getLogHours } from "api/services/tasks";
import { noSubTasks } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddLogHour from "./AddLogHour";
import LogHoursList from "./LogHoursList";

function LogHours() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
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
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            color="secondary"
          >
            Add Log Hour
          </Button>
        ) : null}
      </Box>
      <Box mt={4}>
        {data?.data?.length ? (
          <LogHoursList data={data?.data} />
        ) : (
          <NoItems
            img={noSubTasks}
            title="Add log hour in your task"
            desc="Divide your task into smaller items and add them here"
            btnTitle="Add Log Hour"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddLogHour open={open} setOpen={setOpen} />
    </>
  );
}

export default LogHours;