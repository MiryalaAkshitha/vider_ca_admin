import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { noSubTasks } from "assets";
import NoItems from "components/NoItems";
import { useState } from "react";
import AddSubTask from "./AddSubTask";
import SubTasksList from "./SubTasksList";

function SubTasks({ task }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Sub Tasks
        </Typography>
        {task?.subTasks?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Sub Task
          </Button>
        ) : null}
      </Box>
      <Box mt={4}>
        {task?.subTasks?.length ? (
          <SubTasksList data={task?.subTasks} />
        ) : (
          <NoItems
            img={noSubTasks}
            title="Add a Sub item in your task"
            desc="Divide your task into smaller items and add them here"
            btnTitle="Add Sub Task"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddSubTask open={open} setOpen={setOpen} />
    </>
  );
}

export default SubTasks;
