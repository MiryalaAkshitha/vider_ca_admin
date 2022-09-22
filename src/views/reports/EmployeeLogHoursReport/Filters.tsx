import { Autocomplete, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { IState } from "pages/reports/employee-log-hours-report";
import { useQuery } from "react-query";
import { ResType } from "types";
import { DesktopDatePicker } from "@mui/lab";

interface Props {
  state: IState;
  setState: (state: IState) => void;
  onSubmit: () => void;
}

function Filters({ state, setState, onSubmit }: Props) {
  const { data, isLoading }: ResType = useQuery(["users"], getUsers);

  if (isLoading) return <Loader />;

  return (
    <Paper sx={{ mt: 2, p: 2, py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Autocomplete
            disablePortal
            onChange={(_, v) => setState({ ...state, user: v })}
            options={data?.data || []}
            value={state?.user}
            fullWidth
            size="small"
            getOptionLabel={(option: any) => option?.fullName}
            renderInput={(params) => <TextField {...params} label="Select Employee" />}
          />
        </Grid>
        <Grid item xs={4}>
          <DesktopDatePicker
            label="From Date"
            inputFormat="dd-MM-yyyy"
            value={state.fromDate}
            onChange={(v) => setState({ ...state, fromDate: v })}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={4}>
          <DesktopDatePicker
            label="To Date"
            inputFormat="dd-MM-yyyy"
            value={state.toDate}
            onChange={(v) => setState({ ...state, toDate: v })}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
      </Grid>
      <Box>
        <Button sx={{ mt: 4 }} onClick={onSubmit} color="secondary" variant="contained">
          Generate Report
        </Button>
      </Box>
    </Paper>
  );
}

export default Filters;
