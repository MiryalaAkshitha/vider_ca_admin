import { Grid, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import moment from "moment";
import { DialogProps } from "types";
import { formattedDate } from "utils/formattedDate";

interface Props extends DialogProps {
  data: any;
}

function ViewLogHour({ open, setOpen, data }: Props) {
  return (
    <DialogWrapper title="Log Hour Details" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Log Hour Type
          </Typography>
          <Typography variant="body1">{data?.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Created Date
          </Typography>
          <Typography variant="body1">
            {formattedDate(data?.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Task Name / Title
          </Typography>
          <Typography variant="body1">
            {data.type === "GENERAL" ? data?.title : data?.task?.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Log Hours
          </Typography>
          <Typography variant="body1">
            {moment.utc(+data?.duration).format("HH:mm")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Client
          </Typography>
          <Typography variant="body1">{data?.client?.displayName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Task
          </Typography>
          <Typography variant="body1">{data?.task?.name || "NA"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Description
          </Typography>
          <Typography variant="body1">{data?.description || "NA"}</Typography>
        </Grid>
      </Grid>
    </DialogWrapper>
  );
}

export default ViewLogHour;
