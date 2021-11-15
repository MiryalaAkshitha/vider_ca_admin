import { Typography } from "@mui/material";
import moment from "moment";
import { StyledRecurProfileItem } from "../styles";

interface Props {
  active?: boolean;
  last?: boolean;
  data?: any;
  onClick: () => void;
}

const RecurringProfileItem = ({ active, last, data, onClick }: Props) => {
  return (
    <StyledRecurProfileItem active={active} last={last} onClick={onClick}>
      <Typography color="primary" variant="subtitle2" gutterBottom>
        {data?.name}
      </Typography>
      <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
        Created by {data?.user?.firstName} {data?.user?.lastName}
      </Typography>
      <Typography variant="caption" gutterBottom color="rgba(0,0,0,0.6)">
        on {moment(data?.createdAt).format("MMM DD, YYYY, hh:mm a")}
      </Typography>
    </StyledRecurProfileItem>
  );
};

export default RecurringProfileItem;
