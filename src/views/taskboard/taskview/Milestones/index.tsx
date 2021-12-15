import { Box, Typography } from "@mui/material";
import { noMilestones } from "assets";
import NoItems from "components/NoItems";

function Milestones() {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Milestones
        </Typography>
      </Box>
      <Box mt={4}>
        <NoItems
          img={noMilestones}
          title="Add a milestone to your task"
          desc="Create a Milestone and link the milestone with the Checklist to tract the progress of the task"
          btnTitle="Create Milestone"
        />
      </Box>
    </>
  );
}

export default Milestones;
