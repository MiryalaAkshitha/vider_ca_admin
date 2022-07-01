import { Grid, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { DialogProps } from "types";
import { getTitle } from "utils";

interface Props extends DialogProps {
  data: any;
}

function ViewRecurringProfile({ open, setOpen, data }: Props) {
  return (
    <DialogWrapper
      open={open}
      setOpen={setOpen}
      title="Recurring Profile Details"
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Name
          </Typography>
          <Typography variant="body2">{data?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Status
          </Typography>
          <Typography variant="body2">{getTitle(data?.status)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Task Name
          </Typography>
          <Typography variant="body2">{data?.taskData?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Category Name
          </Typography>
          <Typography variant="body2">
            {data?.taskData?.categoryName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" sx={{ display: "block" }}>
            Frequency
          </Typography>
          <Typography variant="body2">{data?.frequency}</Typography>
        </Grid>
        {data?.frequency !== "custom" && (
          <>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ display: "block" }}>
                Start Date
              </Typography>
              <Typography variant="body2">{data?.startDate}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" sx={{ display: "block" }}>
                End Date
              </Typography>
              <Typography variant="body2">{data?.endDate || "NA"}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </DialogWrapper>
  );
}

export default ViewRecurringProfile;
