import { Checkbox, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormattedDate from "components/FormattedDate";
import _ from "lodash";
import moment from "moment";

type Props = {
  data: any;
};

function LogHoursList({ data }: Props) {
  const grouped = _.groupBy(data, "completedDate");

  return (
    <div>
      {Object.keys(grouped).map((date: any) => (
        <Box mb={3}>
          <FormattedDate date={date} />
          {grouped[date].map((logHour: any) => (
            <Box
              sx={{
                borderBottom: "1px dotted lightgrey",
                display: "flex",
                justifyContent: "space-between",
                p: 2,
              }}
            >
              <Box display="flex" alignItems="center">
                <Checkbox size="small" />
                <Typography variant="body2">
                  {logHour?.user?.firstName}
                </Typography>
              </Box>
              <Typography variant="body2">
                {moment.utc(+logHour?.duration).format("HH [hrs] mm [mins]")}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </div>
  );
}

export default LogHoursList;
