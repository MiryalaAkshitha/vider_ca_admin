import { MoreVert } from "@mui/icons-material";
import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { activateDeactivateUser, deleteUser } from "api/services/users";
import { icons } from "assets";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";

type Props = {
  data: any;
  type: "team" | "user";
  teamId?: number;
};

function UserCard({ data }: Props) {
  const navigate = useNavigate();
  const menu = useMenu();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { mutate: userDelete } = useMutation(deleteUser, {
    onSuccess: () => {
      snack.success("User deleted");
      queryClient.invalidateQueries("all-users");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { mutate } = useMutation(activateDeactivateUser, {
    onSuccess: (res: any) => {
      snack.success("User has been " + (res?.data?.isActive ? "Activated" : "Deactivated"));
      queryClient.invalidateQueries("all-users");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleMenu = (e: any) => {
    e.stopPropagation();
    const status = data.isActive ? "Deactivate" : "Activate";
    menu({
      target: e.currentTarget,
      options: [
        {
          label: status,
          action: () => {
            confirm({
              msg: `Are you sure you want to ${status} ${data?.fullName}?`,
              action: () => mutate({ id: data?.id, data: { active: !data?.isActive } }),
            });
          },
        },
        {
          label: "Delete",
          action: () => {
            confirm({
              msg: `Are you sure you want to delete ${data?.fullName}?`,
              action: () => userDelete(data?.id),
            });
          },
        },
      ],
    });
  };

  return (
    <>
      <Paper
        sx={{
          position: "relative",
          px: 2,
          py: 5,
          textAlign: "center",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/settings/users/${data.id}?tab=Profile`)}
      >
        <Avatar
          sx={{ width: 80, mb: 2, height: 80, mx: "auto" }}
          src={data?.imageUrl || icons.user}
        />
        <Typography gutterBottom variant="subtitle2" color="primary">
          {data?.fullName}
        </Typography>
        <Typography variant="body2" color="rgba(0,0,0,0.5)">
          {data?.email}
        </Typography>
        <Typography sx={{ mt: 4 }} variant="body2" color="#149ECD">
          {data?.role?.name}
        </Typography>
        {!data?.role?.defaultRole && (
          <IconButton onClick={handleMenu} sx={{ position: "absolute", top: 10, right: 10 }}>
            <MoreVert />
          </IconButton>
        )}
        {!data?.isActive && (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              left: 0,
              bottom: 0,
              textAlign: "center",
              background: (theme) => theme.palette.secondary.light,
              color: "white",
              py: "2px",
            }}
          >
            <Typography variant="body2">Inactive</Typography>
          </Box>
        )}
      </Paper>
    </>
  );
}

export default UserCard;
