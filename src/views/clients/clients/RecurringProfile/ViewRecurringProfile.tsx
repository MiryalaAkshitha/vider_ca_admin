import { Grid, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { DialogProps } from "types";

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
      </Grid>
    </DialogWrapper>
  );
}

export default ViewRecurringProfile;
