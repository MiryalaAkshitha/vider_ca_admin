import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getForms } from "api/services/forms";
import { noDueDiligence } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import SelectFormTemplate from "./SelectFormTemplate";
import IProAddedFormCard from "./IProAddedFormCard";

function DueDiligence() {
  const params: any = useParams();
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["task-forms", { type: "TASK", taskId: params.taskId }],
    getForms
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          IPro
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add form
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <Grid container spacing={2}>
            {data?.data?.map((item: any, index: number) => (
              <Grid item xs={6} key={index}>
                <IProAddedFormCard data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoItems
            img={noDueDiligence}
            title="Add a form to your task"
            desc="Add a form template for the task and share it with your clients"
            btnTitle="Add form"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <SelectFormTemplate
        open={open}
        setOpen={setOpen}
        queryKey="task-forms"
        type="TASK"
        typeId={params.taskId}
      />
    </>
  );
}

export default DueDiligence;
