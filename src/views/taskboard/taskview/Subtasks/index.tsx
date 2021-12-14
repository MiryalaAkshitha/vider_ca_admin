import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getSubTasks } from "api/services/tasks";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResponseType } from "types";
import AddSubTask from "./AddSubTask";
import NoSubTasks from "./NoSubTasks";
import SubTasksList from "./SubTasksList";

function SubTasks() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResponseType = useQuery(
    ["subtasks", params.taskId],
    getSubTasks
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Sub Tasks
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            variant="outlined"
          >
            Add Sub Task
          </Button>
        ) : null}
      </Box>
      <Box mt={4}>
        {data?.data?.length ? (
          <SubTasksList data={data?.data} />
        ) : (
          <NoSubTasks action={() => setOpen(true)} />
        )}
      </Box>
      <AddSubTask open={open} setOpen={setOpen} />
    </>
  );
}

export default SubTasks;
