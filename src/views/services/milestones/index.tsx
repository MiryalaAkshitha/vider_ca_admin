import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { noChecklists } from "assets";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import AddMilestone from "views/services/Milestones/AddMilestone";
import Milestone from "views/services/Milestones/Milestone";

function Milestones() {
  const [open, setOpen] = useState<boolean>(false);
  const { milestones } = useSelector(addServiceState);

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Milestones
        </Typography>
        {milestones.length ? (
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
        {milestones.length ? (
          <Grid container spacing={2}>
            {milestones.map((item: any, index: number) => (
              <Grid item xs={4}>
                <Milestone data={item} key={index} index={index} />
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
      <AddMilestone open={open} setOpen={setOpen} />
    </>
  );
}

export default Milestones;
