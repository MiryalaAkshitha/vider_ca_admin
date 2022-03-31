import { MoreVertRounded } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { removeFromTeam } from "api/services/users";
import { icons } from "assets";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledUserCard } from "./styles";

type Props = {
  data: any;
  type: "team" | "user";
  teamId?: number;
};

function UserCard({ data, type, teamId }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const confirm = useConfirm();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { mutate } = useMutation(removeFromTeam, {
    onSuccess: () => {
      snack.success("Team member removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("team");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRemoveFromTeam = () => {
    console.log(teamId);
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to remove this member from the team?",
      action: () => {
        mutate({
          teamId,
          userId: data.id,
        });
      },
    });
  };

  return (
    <>
      <StyledUserCard
        onClick={() => {
          navigate(`/settings/users/${data.id}/profile`);
        }}
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
          {data?.roles[0]?.name}
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: 20, right: 20 }}
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertRounded />
        </IconButton>
      </StyledUserCard>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {type === "user" &&
          ["Remove"].map((item) => (
            <MenuItem
              key={item}
              onClick={() => {
                setAnchorEl(null);
              }}
            >
              {item}
            </MenuItem>
          ))}
        {type === "team" && (
          <MenuItem onClick={handleRemoveFromTeam}>Remove from team</MenuItem>
        )}
      </Menu>
    </>
  );
}

export default UserCard;
