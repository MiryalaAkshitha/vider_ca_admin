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

const EventDialog = ({ open, setOpen, data }) => {
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
      <Dialog
        sx={{ zIndex: "3" }}
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box p={2} sx={{ cursor: "pointer" }}>
          <Box
            sx={{
              zIndex: 3,
              display: "flex",
              boxShadow: "none",
              p: "0.3rem 1rem",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="subtitle2">{data.title}</Typography>
              <IconButton onClick={EditEventClicked}>
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete}>
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </IconButton>
            </Box>
            <Button sx={{ minWidth: 60 }} onClick={() => setOpen(false)}>
              Close
            </Button>
          </Box>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: "#182F53" }}>
                  {moment(data.date).format("MMMM DD, YYYY")} (
                  {moment(data.startTime).format("hh:mm a")} -
                  {moment(data.endTime).format("hh:mm a")})
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Client</Typography>
                <Typography variant="body1">
                  {data?.client ? data.client?.displayName : "Na"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Task</Typography>
                <Typography variant="body1">
                  {data?.task ? data.task?.name : "Na"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" component="div">
                  Members
                </Typography>
                {data?.members?.map((item: any, index: number) => (
                  <Typography variant="body1" component="span" key={index}>
                    {item?.fullName ? item.fullName : "Na"},
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Location</Typography>
                <Typography variant="body1">
                  {data?.location ? data.location : "Na"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">Notes</Typography>
                <Typography variant="body1">
                  {data?.notes ? data.notes : "Na"}
                </Typography>
              </Grid>
              {data?.reminder && (
                <Grid item xs={12}>
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
            </Grid>
          </Box>
        </Box>
      </Dialog>
      <EditEvent data={data} open={editOpen} setOpen={setEditOpen} />
    </>
  );
};

export default EventDialog;
