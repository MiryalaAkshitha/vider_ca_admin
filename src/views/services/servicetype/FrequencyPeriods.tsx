import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFrequencyDate,
  addServiceState,
} from "redux/reducers/addServiceSlice";
import { UpdateFrequencyPayload } from "redux/reducers/addServiceSlice/types";
import DayPicker from "./DayPicker";
import { CustomTable } from "./styles";

function FrequencyPeriods() {
  const dispatch = useDispatch();
  const { frequencyPeriods } = useSelector(addServiceState);

  const handleChange = ({ index, name, value }: UpdateFrequencyPayload) => {
    dispatch(updateFrequencyDate({ index, name, value }));
  };

  if (!frequencyPeriods.length) return <div></div>;
  return (
    <Box>
      <CustomTable>
        <thead>
          <tr>
            <th>
              <Typography color='GrayText'>Period</Typography>
            </th>
            <th>
              <Typography color='GrayText'>Start Date</Typography>
            </th>
            <th>
              <Typography color='GrayText'>End Date</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {frequencyPeriods.map((item, index) => (
            <tr key={index}>
              <td>
                <Typography color='primary' variant='body2'>
                  {item.period}
                </Typography>
              </td>
              <td>
                <DayPicker
                  onChange={(value) =>
                    handleChange({ index, name: "startDate", value })
                  }
                  value={item.startDate}
                />
              </td>
              <td>
                <DayPicker
                  onChange={(value) =>
                    handleChange({ index, name: "endDate", value })
                  }
                  value={item.endDate}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </Box>
  );
}

export default FrequencyPeriods;
