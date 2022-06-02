import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getStageOfWork } from "api/services/tasks";
import { noChecklists } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddStageOfWork from "./AddStageOfWork";
import Stage from "./Stage";

function StageOfWork() {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["stage-of-work", params.taskId],
    getStageOfWork
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Stage of Work
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add stage of work
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <Box
            maxWidth={800}
            sx={{
              "& > div": {
                mb: 3,
              },
            }}
          >
            {data?.data?.map((item: any, index: number) => (
              <Stage data={item} key={index} index={index} />
            ))}
          </Box>
        ) : (
          <NoItems
            img={noChecklists}
            title="Add stage of work to your task"
            desc="Create a stage of work in your task"
            btnTitle="Add stage of work"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddStageOfWork open={open} setOpen={setOpen} />
    </>
  );
}

export default StageOfWork;
