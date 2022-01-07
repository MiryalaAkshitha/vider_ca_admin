import { Box } from "@mui/system";
import FormattedDate from "components/FormattedDate";
import _ from "lodash";
import LogHourItem from "./LogHourItem";

type Props = {
  data: any;
  onSelect: (id: number) => void;
  selectedItems: number[];
};

function LogHoursList({ data, onSelect, selectedItems }: Props) {
  const grouped = _.groupBy(data, "completedDate");

  return (
    <div>
      {Object.keys(grouped).map((date: any) => (
        <Box mb={3}>
          <FormattedDate date={date} />
          {grouped[date].map((logHour: any) => (
            <LogHourItem
              selectedItems={selectedItems}
              onSelect={onSelect}
              logHour={logHour}
            />
          ))}
        </Box>
      ))}
    </div>
  );
}

export default LogHoursList;
