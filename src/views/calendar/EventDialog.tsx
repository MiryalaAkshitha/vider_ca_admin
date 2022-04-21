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
import moment from "moment";
import { useState } from "react";
import EditEvent from "./EditEvent";

const EventDialog = ({ open, setOpen, data }) => {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(false);

  const EditEventClicked = () => {
    setState(true);
    setOpen(false);
    setValue(data);
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
              <IconButton>
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
                  {moment(data.date).format("MMMM d, YYYY")} (
                  {moment(data.startTime).format("hh:mm a")} -
                  {moment(data.endTime).format("hh:mm a")})
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Client</Typography>
                <Typography variant="body1">
                  {data?.client ? data.client : <>Na</>}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Task</Typography>
                <Typography variant="body1">
                  {data?.task ? data.task : <>Na</>}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" component="div">
                  Members
                </Typography>

                {data?.members?.map((item) => (
                  <Typography variant="body1" component="span">
                    {item?.fullName ? item.fullName : <>Na</>},
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Location</Typography>
                <Typography variant="body1">
                  {data?.location ? data.location : <>Na</>}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">Notes</Typography>
                <Typography variant="body1">
                  {data?.notes ? data.notes : <>Na</>}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ fontWeight: 600 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessAlarmOutlinedIcon fontSize="small" />

                  <Typography variant="body1" sx={{ padding: "5px" }}>
                    {data?.reminder ? data.reminder : <>No Reminder added</>}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Dialog>

      <EditEvent data={value} open={state} setOpen={setState} />
    </>
  );
};

export default EventDialog;
