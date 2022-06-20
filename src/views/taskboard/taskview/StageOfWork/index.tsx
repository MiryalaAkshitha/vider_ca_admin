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
      {data?.data?.length > 0 && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add stage of work
          </Button>
        </Box>
      )}
      <Box mt={2}>
        {data?.data?.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="primary">
                Stage of Work
              </Typography>
              {data?.data
                ?.filter((item: any) => item?.type === "STAGE_OF_WORK")
                ?.map((item: any, index: number) => (
                  <Box mt={2} key={index}>
                    <Stage data={item} index={index} />
                  </Box>
                ))}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1" color="primary">
                Deliverables
              </Typography>
              {data?.data
                ?.filter((item: any) => item?.type === "DELIVERABLES")
                ?.map((item: any, index: number) => (
                  <Box mt={2} key={index}>
                    <Stage data={item} index={index} />
                  </Box>
                ))}
            </Grid>
          </Grid>
        )}
        {data?.data?.length === 0 && (
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
