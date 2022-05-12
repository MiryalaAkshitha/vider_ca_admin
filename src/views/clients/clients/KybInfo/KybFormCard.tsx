import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { deleteForm } from "api/services/forms";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "views/forms/styles";

interface Props {
  data: any;
}

function KybFormCard({ data }: Props) {
  const menu = useMenu();
  const navigate = useNavigate();

  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("client-forms");
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
          label: "Form details",
          action: () => {
            navigate(`${data?._id}?formName=${data?.name}`);
          },
        },
        {
          label: "Audit log",
          action: () => {
            navigate(`${data?._id}/audit-log?formName=${data?.name}`);
          },
        },
        {
          label: "Edit",
          action: () => {
            navigate(`${data?._id}/edit?formName=${data?.name}`);
          },
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
      <StyledCard sx={{ py: 3 }}>
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
      </StyledCard>
    </>
  );
}

export default KybFormCard;
