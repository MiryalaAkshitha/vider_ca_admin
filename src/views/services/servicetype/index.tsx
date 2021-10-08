import {
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import { icons } from "assets";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceState,
  selectFrequencyPeriods,
  updateFrequency,
  updateServiceType,
} from "redux/reducers/addServiceSlice";
import { FREQUENCY_TEXTS } from "utils/constants";
import SelectDay from "./SelectDay";
import { CustomTable } from "./styles";

function ServiceType() {
  const dispatch = useDispatch();
  const state = useSelector(addServiceState);

  const setServiceType = (e: any) => {
    dispatch(updateServiceType(e.target.value));
  };

  const setFrequency = (e: any) => {
    dispatch(updateFrequency(e.target.value));
  };

  return (
    <Box>
      <Typography variant='subtitle2' color='primary'>
        Frequency
      </Typography>
      <Container sx={{ mt: 4 }}>
        <Box mt={3}>
          <Typography variant='body2' color='primary'>
            Type of service
          </Typography>
          <RadioGroup row onChange={setServiceType} name='serviceType'>
            <FormControlLabel
              value='Non-Recurring service'
              control={<Radio color='success' />}
              label='Non-Recurring service'
            />
            <FormControlLabel
              value='Recurring service'
              control={<Radio color='success' />}
              label='Recurring service'
            />
          </RadioGroup>
        </Box>
        {state.recurring && (
          <Box mt={3}>
            <Typography mb={1} variant='body2' color='primary'>
              Select Frequency
            </Typography>
            <TextField onChange={setFrequency} fullWidth size='small' select>
              {FREQUENCY_TEXTS.map((option: any, index: any) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <FrequencyPeriods />
          </Box>
        )}
      </Container>
    </Box>
  );
}

function FrequencyPeriods() {
  const frequencyPeriods = useSelector(selectFrequencyPeriods);

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
                <DayPicker value={item.startDate} />
              </td>
              <td>
                <DayPicker value={item.endDate} />
              </td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    </Box>
  );
}

interface DayPickerProps {
  value: string;
  onChange?: (v: string) => void;
}

function DayPicker({ value, onChange }: DayPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        border='1px solid lightgrey'
        maxWidth={200}
        justifyContent='space-between'
        p='5px 10px'
        sx={{ cursor: "pointer" }}
        borderRadius='4px'
        display='flex'>
        <Typography color='primary' variant='body2'>
          {value}
        </Typography>
        <img src={icons.date} alt='' />
      </Box>
      <SelectDay open={open} setOpen={setOpen} />
    </>
  );
}

export default ServiceType;
