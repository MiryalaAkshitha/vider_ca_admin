import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useMenu } from "context/MenuPopover";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  data: any;
}

function IProAddedFormCard({ data }: Props) {
  const menu = useMenu();
  const navigate = useNavigate();
  const params = useParams();

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "View",
          action: () => {
            navigate(`/tasks/${params.taskId}/iPro/${data?._id}/view`);
          },
        },
        {
          label: "Preview",
          action: () => window.open(`/forms/access/${data._id}?preview=true`),
        },
      ],
    });
  };

  return (
    <Box
      sx={{
        border: "2px solid #0D47A11A",
        display: "flex",
        gap: 1,
        borderRadius: 2,
        p: 2,
        pt: 4,
        position: "relative",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Typography variant="body2" color="rgba(0,0,0,0.6)">
              Form Name
            </Typography>
            <Typography variant="h6" color="primary">
              {data?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography variant="body2" color="rgba(0,0,0,0.6)">
              Last Updated on
            </Typography>
            <Typography variant="h6" color="primary">
              {moment(data?.updatedAt).format("MMM DD, YYYY hh:mm A")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <IconButton
        onClick={handleMenu}
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}

export default IProAddedFormCard;
