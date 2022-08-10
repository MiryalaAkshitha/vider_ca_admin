import { Attachment } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { DialogProps } from "types";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";

interface Props extends DialogProps {
  data: any;
}

function ViewExpenditure({ open, setOpen, data }: Props) {
  return (
    <DialogWrapper title="Expenditure Details" open={open} setOpen={setOpen}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Expense Type
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
            Particular name
          </Typography>
          <Typography variant="body1">{data?.particularName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Amount
          </Typography>
          <Typography variant="body1">{data?.amount}</Typography>
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
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Task Expense Type
          </Typography>
          <Typography variant="body1">
            {getTitle(data?.taskExpenseType) || "NA"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            Attachment
          </Typography>
          {data?.attachment ? (
            <div>
              <a
                href={data?.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton color="secondary">
                  <Attachment />
                </IconButton>
              </a>
            </div>
          ) : (
            <Typography variant="body1">NA</Typography>
          )}
        </Grid>
      </Grid>
    </DialogWrapper>
  );
}

export default ViewExpenditure;
