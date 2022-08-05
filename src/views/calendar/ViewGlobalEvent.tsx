import AccessAlarmOutlinedIcon from "@mui/icons-material/AccessAlarmOutlined";
import { Box, Grid, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import moment from "moment";
import { getTitle } from "utils";

const ViewGlobalEvent = ({ open, setOpen, data }) => {
  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Event Details">
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="caption">Title</Typography>
            <Typography variant="subtitle2">{data.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">Date</Typography>
            <Typography variant="body1" sx={{ color: "#182F53" }}>
              {moment(data.date).format("MMMM DD, YYYY")}
            </Typography>
          </Grid>
          {data.startTime && (
            <Grid item xs={12}>
              <Typography variant="caption">Time</Typography>
              <Typography variant="body1" sx={{ color: "#182F53" }}>
                {moment(data.startTime).format("hh:mm a")} -
                {moment(data.endTime).format("hh:mm a")}
              </Typography>
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="caption">Location</Typography>
            <Typography variant="body1">
              {data?.location ? data.location : "NA"}
            </Typography>
          </Grid>
          {data?.reminder && (
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessAlarmOutlinedIcon fontSize="small" />
                <Typography variant="body1">
                  {getTitle(data.reminder)}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="caption">Notes:</Typography>
            <Typography>
              <Box
                sx={{ "& h3, & p": { margin: 0 } }}
                dangerouslySetInnerHTML={{
                  __html: data?.notes ? data.notes : "NA",
                }}
              ></Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </DialogWrapper>
  );
};

export default ViewGlobalEvent;
