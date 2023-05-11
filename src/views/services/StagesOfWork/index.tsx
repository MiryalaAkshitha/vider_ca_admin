import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { noChecklists } from "assets";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import AddStageOfWork from "./AddStageOfWork";
import Stage from "./Stage";

function StageOfWork() {
  const [open, setOpen] = useState<boolean>(false);
  const { stageOfWork } = useSelector(addServiceState);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
        Milestones
        </Typography>
        {stageOfWork.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
             Add milestone
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {stageOfWork.length ? (
          <Grid container spacing={2}>
            {stageOfWork.map((item: any, index: number) => (
              <Grid item xs={6}>
                <Stage data={item} key={index} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoItems
            img={noChecklists}
            title="Add Milestone to your service"
            desc="Create a milestone in your service."
            btnTitle="Add Milestone"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddStageOfWork open={open} setOpen={setOpen} />
    </>
  );
}

export default StageOfWork;
