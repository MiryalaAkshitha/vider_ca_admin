import { Box, Typography } from "@mui/material";
import moment from "moment";
import { getTitle } from "utils";
import { StyledRecurProfileItem } from "views/clients/styles";

interface Props {
  active?: boolean;
  last?: boolean;
  data?: any;
  onClick: () => void;
}

const RecurringProfileItem = ({ active, last, data, onClick }: Props) => {
  return (
    <>
      <StyledRecurProfileItem
        active={active ? 1 : 0}
        last={last ? 1 : 0}
        onClick={onClick}
      >
        <Box flex={1}>
          <Typography color="primary" variant="subtitle2" gutterBottom>
            {data?.name} - {getTitle(data?.frequency)}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Financial year: {data?.financialYear}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Frequency: {getTitle(data?.frequency)}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Created by {data?.user?.fullName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block" }}
            gutterBottom
            color="rgba(0,0,0,0.6)"
          >
            on {moment(data?.createdAt).format("MMM DD, YYYY, hh:mm a")}
          </Typography>
        </Box>
      </StyledRecurProfileItem>
    </>
  );
};

export default RecurringProfileItem;
