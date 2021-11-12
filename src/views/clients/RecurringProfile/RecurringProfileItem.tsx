import { Typography } from "@mui/material";
import { StyledRecurProfileItem } from "../styles";

interface Props {
  active?: boolean;
  last?: boolean;
}

const RecurringProfileItem = ({ active, last }: Props) => {
  return (
    <StyledRecurProfileItem active={active} last={last}>
      <Typography color="primary" variant="subtitle2" gutterBottom>
        Service Name 1
      </Typography>
      <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
        Created by Vinay Kumar
      </Typography>
      <Typography variant="caption" gutterBottom color="rgba(0,0,0,0.6)">
        on 02/Aug/2021, 01:37 PM
      </Typography>
    </StyledRecurProfileItem>
  );
};

export default RecurringProfileItem;
