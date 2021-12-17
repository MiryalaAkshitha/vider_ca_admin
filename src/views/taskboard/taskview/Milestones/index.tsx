import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getMilestones } from "api/services/tasks";
import { noMilestones } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddMilestone from "./AddMilestone";
import MileStone from "./milestone";

function Milestones() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["milestones", params.taskId],
    getMilestones
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Milestones
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Milestone
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <Box display="flex" gap={2}>
            {data?.data?.map((item: any, index: number) => (
              <MileStone data={item} key={index} index={index} />
            ))}
          </Box>
        ) : (
          <NoItems
            img={noMilestones}
            title="Add a milestone to your task"
            desc="Create a Milestone and link the milestone with the Checklist to tract the progress of the task"
            btnTitle="Create Milestone"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddMilestone open={open} setOpen={setOpen} />
    </>
  );
}

export default Milestones;
