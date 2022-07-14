import { Avatar, Typography } from "@mui/material";
import { icons } from "assets";
import { useNavigate } from "react-router-dom";
import { StyledUserCard } from "./styles";

type Props = {
  data: any;
  type: "team" | "user";
  teamId?: number;
};

function UserCard({ data }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <StyledUserCard
        onClick={() => {
          navigate(`/settings/users/${data.id}`);
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
          {data?.role?.name}
        </Typography>
      </StyledUserCard>
    </>
  );
}

export default UserCard;
