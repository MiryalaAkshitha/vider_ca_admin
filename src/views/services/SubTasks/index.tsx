import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { noChecklists } from "assets";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import AddSubtask from "./AddSubtask";
import Subtask from "./Subtask";

function Subtasks() {
  const [open, setOpen] = useState<boolean>(false);
  const { subTasks } = useSelector(addServiceState);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Subtasks
        </Typography>
        {subTasks.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Subtask
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {subTasks.length ? (
          <Grid container spacing={2}>
            {subTasks.map((item: any, index: number) => (
              <Grid item xs={4}>
                <Subtask data={item} key={index} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoItems
            img={noChecklists}
            title="Add subtask to your service"
            desc="Create a subtask in your service."
            btnTitle="Add subtask"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddSubtask open={open} setOpen={setOpen} />
    </>
  );
}

export default Subtasks;
