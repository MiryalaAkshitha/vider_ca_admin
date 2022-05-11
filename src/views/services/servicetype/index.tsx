import {
  Checkbox,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  addServiceState,
  repeateStartAndEndDates,
  updateFrequency,
  updateServiceType,
} from "redux/reducers/addServiceSlice";
import { FREQUENCY_TEXTS } from "utils/constants";
import FrequencyPeriods from "./FrequencyPeriods";

function ServiceType() {
  const dispatch = useDispatch();
  const state = useSelector(addServiceState);

  const setServiceType = (e: any) => {
    dispatch(updateServiceType(e.target.value));
  };

  const setFrequency = (e: any) => {
    dispatch(updateFrequency(e.target.value));
  };

  const handleRepeatDates = (e: any) => {
    dispatch(repeateStartAndEndDates());
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
            <Box display='flex' justifyContent='space-between'>
              <Typography
                sx={{ alignSelf: "flex-end" }}
                mb={1}
                variant='body2'
                color='primary'>
                Select Frequency
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    color='secondary'
                    checked={state.repeated}
                    onChange={handleRepeatDates}
                  />
                }
                label='Repeat the same start date and end date'
              />
            </Box>
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

export default ServiceType;
