import { Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function DueCard({ data }: { data: any }) {
  const navigate = useNavigate();

  return (
    <Grid
      onClick={() => navigate(`/dsc-register/${data.id}`)}
      container
      spacing={1}
      sx={{
        border: "1px solid #e0e0e0",
        marginTop: "20px",
        borderRadius: "10px",
        padding: "15px",
        cursor: "pointer",
      }}
    >
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          DSC Holder
        </Typography>
        <Typography variant="body2">{data?.holderName}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          Client
        </Typography>
        <Typography variant="body2">{data?.client?.displayName}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
          DSC Expiry Date
        </Typography>
        <Typography variant="body2" color="primary">
          {format(new Date(data?.expiryDate), "dd MMM, yyyy")}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="caption" color="rgba(0,0,0,0.4)">
         # Days to DSC Expiry
        </Typography>
        <Typography variant="body2" color="primary">
          {moment(data?.expiryDate).diff(moment(), "days")}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DueCard;
