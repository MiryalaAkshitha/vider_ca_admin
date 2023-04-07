import { DatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Autocomplete,
  Typography
} from "@mui/material";
import { useState } from "react";
import { handleChange } from "redux/reducers/addServiceSlice";

interface Props {
  state: any;
  setState: (state: any) => void;
  onSubmit: () => void;
  filterfields: any;
}

function Filters({ state, setState, onSubmit, filterfields }: Props) {
  const [filter, SetFilter] = useState();
 
   const disablePrevDates = (startDate) => {
     const startSeconds = Date.parse(startDate);
      return (date) => {
        return Date.parse(date) <= startSeconds;
      }
   }
   
  const handleChange = (v: any, value?: any, field?: any) => {
    if(field.type == 'date') {
      if(field.filter) {
      SetFilter(v);
        } 
      setState({ ...state, ['' + field.name]: v });
    }    
    if(field.type == 'dropdown') {
      setState({ ...state, ['' + field.name]: value });
    }
  }

  return (
    <Paper sx={{ mt: 2, p: 2, py: 4 }}>
      <Grid container spacing={2}>
        {filterfields?.map((field: any) => (
          <>
            {field.type == 'date' &&
              <Grid item xs={4}>
                <DatePicker
                 shouldDisableDate={disablePrevDates(state[field.filter])}
                  label={field.label}
                  value={state[field.name]}
                  inputFormat="dd-MM-yyyy"
                  onChange={(v) => handleChange(v, null, field)}
                  renderInput={(params) => <TextField fullWidth size="small" {...params} required
                  />}
                />
              </Grid>
            }

            {field.type == 'dropdown' &&
              <Grid item xs={4}>
                <Autocomplete
                  size="small"
                  onChange={(v, value) => handleChange(v, value, field)}
                  options={field.options || []}
                  getOptionLabel={(option: any) => option[field.optionName]}
                  renderInput={(params) => (
                    <TextField {...params} label={field.label} variant="outlined" />
                  )}
                />
              </Grid>
            }

          </>
        )
        )}
      </Grid>
      <Button onClick={onSubmit} sx={{ mt: 3 }} color="secondary" variant="contained">
        Generate Report
      </Button>
    </Paper>
  );
}

export default Filters;
