import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getEvents } from "api/services/events";
import { noEvents } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import EventCard from "./EventCard";
import LinkEvent from "./LinkEvent";

function Events({ task }: any) {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["events", { taskId: params.taskId }],
    getEvents
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Events
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Event
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <Grid container spacing={2}>
            {data?.data?.map((item: any, index: number) => (
              <Grid item xs={4} key={index}>
                <EventCard task={task} data={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoItems
            img={noEvents}
            title="Add a Events in your task"
            desc="Adding events will enhance the performance and meet deadlines"
            btnTitle="Add event"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <LinkEvent open={open} setOpen={setOpen} task={task} />
    </>
  );
}

export default Events;
