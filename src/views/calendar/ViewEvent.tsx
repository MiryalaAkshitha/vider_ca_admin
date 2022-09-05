import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { deleteEvent } from "api/services/events";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getTitle } from "utils";
import EditEvent from "./EditEvent";

const ViewEvent = ({ open, setOpen, data, from = "calendar" }) => {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const confirm = useConfirm();

  const EditEventClicked = () => {
    setEditOpen(true);
    setOpen(false);
  };

  let { mutate } = useMutation(deleteEvent, {
    onSuccess: () => {
      snack.success("Event deleted");
      setOpen(false);
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this event?",
      action: () => {
        mutate({
          id: data.id,
        });
      },
    });
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <Box p={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" gap="4px" alignItems="center">
              <Typography variant="subtitle2">{data.title}</Typography>
              {from === "calendar" && (
                <>
                  <IconButton onClick={EditEventClicked}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
            <Button sx={{ minWidth: 60 }} onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>
          <Typography mt={1} variant="body2" sx={{ color: "#182F53" }}>
            {moment(data.date).format("MMMM DD, YYYY")} (
            {data?.startTime &&
              data?.endTime &&
              ` (${moment(data.startTime).format("hh:mm a")} -
                  ${moment(data.endTime).format("hh:mm a")})`}
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <Typography variant="caption">Client:</Typography>
              <Typography variant="body1">
                {data?.client ? data.client?.displayName : "Na"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Task:</Typography>
              <Typography variant="body1">
                {data?.task ? data.task?.name : "Na"}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" component="div">
                Members:
              </Typography>
              {data?.members?.length ? (
                <Typography variant="body1">
                  {data?.members
                    ?.map((member: any) => member.fullName)
                    .join(", ")}
                </Typography>
              ) : (
                <Typography variant="body1">Na</Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Location:</Typography>
              <Typography variant="body1">
                {data?.location ? data.location : "Na"}
              </Typography>
            </Grid>
            {data?.reminder && (
              <Grid item xs={12}>
                <Typography variant="caption">Reminder:</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessAlarmOutlinedIcon fontSize="small" />
                  <Typography variant="body1" sx={{ padding: "5px" }}>
                    {getTitle(data.reminder)}
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="caption">Notes:</Typography>
              <Typography>
                <Box
                  sx={{ "& h3, & p, & ol, & ul": { margin: 0 } }}
                  dangerouslySetInnerHTML={{
                    __html: data?.notes ? data.notes : "NA",
                  }}
                ></Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
      <EditEvent data={data} open={editOpen} setOpen={setEditOpen} />
    </>
  );
};

export default ViewEvent;
