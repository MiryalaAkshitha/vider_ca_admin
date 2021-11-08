import { Avatar, Typography } from "@mui/material";
import { icons } from "assets";
import { StyledUserCard } from "./styles";

function UserCard({ data }: any) {
  return (
    <StyledUserCard>
      <Avatar
        sx={{ width: 80, mb: 2, height: 80, mx: "auto" }}
        src={data?.imageUrl || icons.user}
      />
      <Typography gutterBottom variant="subtitle2" color="primary">
        {data?.firstName + " " + data?.lastName}
      </Typography>
      <Typography variant="body2" color="rgba(0,0,0,0.5)">
        {data?.email}
      </Typography>
      <Typography sx={{ mt: 4 }} variant="body2" color="#149ECD">
        {data?.roles[0]?.name}
      </Typography>
    </StyledUserCard>
  );
}

export default UserCard;
