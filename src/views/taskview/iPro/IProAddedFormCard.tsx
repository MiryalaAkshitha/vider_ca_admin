import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { deleteForm } from "api/services/forms";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  data: any;
}

function IProAddedFormCard({ data }: Props) {
  const menu = useMenu();
  const navigate = useNavigate();
  const params = useParams();
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("task-forms");
      snack.success("Form deleted");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

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
          label: "Edit",
          action: () => {
            navigate(`/tasks/${params.taskId}/iPro/${data?._id}/edit`);
          },
        },
        {
          label: "Preview",
          action: () => window.open(`/forms/access/${data._id}?preview=true`),
        },
        {
          label: "Delete",
          action: () => {
            confirm({
              msg: "Are you sure you want to delete this form?",
              action: () => {
                mutate({ id: data._id });
              },
            });
          },
        },
      ],
    });
  };

  return (
    <>
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
    </>
  );
}

export default IProAddedFormCard;
