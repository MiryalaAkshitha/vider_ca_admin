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
      {Object.keys(grouped).map((date: any, index: number) => (
        <Box mb={3} key={index}>
          <FormattedDate date={date} />
          {grouped[date].map((logHour: any, index: number) => (
            <LogHourItem
              key={index}
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
