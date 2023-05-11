import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateTask } from "api/services/tasks/tasks";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import ReactQuill from "lib/react-quill";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function Description() {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({});
  const taskData: any = useTaskData();

  useEffect(() => {
    if (taskData) {
      setState(taskData);
    }
  }, [taskData]);

  const { mutate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      // snack.success("Task Details Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    mutate({
      id: taskData?.id,
      data: state,
    });
  };

  return (
    <>
      <Typography variant="subtitle1" color="primary">
        Description
      </Typography>
      <Box mt={3}>
        <ReactQuill
          value={state?.description || ""}
          onChange={(v: any) => {
            setState({
              ...state,
              description: v,
            });
          }}
          id="overview"
        />
        <Box mt={2} textAlign="right">
          <Button onClick={handleUpdate} variant="contained" color="secondary">
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Description;
