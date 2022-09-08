import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import moment from "moment";

function DueCard({ data }: { data: any }) {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        border: "1px solid #e0e0e0",
        marginTop: "20px",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          DSC Holder Name
        </Typography>
        <Typography variant="body2">{data?.holderName}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          Client Name
        </Typography>
        <Typography variant="body2">{data?.client?.displayName}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          Expiry Date
        </Typography>
        <Typography variant="body2" color="primary">
          {format(new Date(data?.expiryDate), "dd MMM, yyyy")}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          Number of days to expire
        </Typography>
        <Typography variant="body2" color="primary">
          {moment(data?.expiryDate).diff(moment(), "days")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DueCard;
