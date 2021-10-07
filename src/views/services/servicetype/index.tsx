import {
  Button,
  Checkbox,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { FREQUENCY_TEXTS } from "utils/constants";

function ServiceType() {
  const [serviceType, setServiceType] = useState("Recurring Service");
  const [frequency, setFrequency] = useState("");

  return (
    <Box>
      <Typography variant='subtitle2' color='primary'>
        Service Type
      </Typography>
      <Container sx={{ mt: 4 }}>
        <Box mt={3}>
          <Typography variant='body2' color='primary'>
            Service Type
          </Typography>
          <RadioGroup
            row
            onChange={(e) => setServiceType(e.target.value)}
            name='serviceType'>
            <FormControlLabel
              value='Recurring service'
              control={<Radio color='success' />}
              label='Recurring service'
            />
            <FormControlLabel
              value='Non-Recurring service'
              control={<Radio color='success' />}
              label='Non-Recurring service'
            />
          </RadioGroup>
        </Box>
        {serviceType == "Non-Recurring service" && (
          <Box mt={3}>
            <Typography mb={1} variant='body2' color='primary'>
              Select Frequency
            </Typography>
            <TextField
              onChange={(e) => setFrequency(e.target.value)}
              fullWidth
              size='small'
              select>
              {FREQUENCY_TEXTS.map((option: any, index: any) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Box>
              {frequency == "Custom" && (
                <Box mt={1} textAlign='right'>
                  <Button variant='outlined' color='secondary'>
                    + Add Duration
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ServiceType;
