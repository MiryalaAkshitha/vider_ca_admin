import { DesktopDatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { IState } from "pages/reports/employee-log-hours-report";
import { useQuery } from "react-query";
import { ResType } from "types";

interface Props {
  state: IState;
  setState: (state: IState) => void;
  onSubmit: () => void;
}

function Filters({ state, setState, onSubmit }: Props) {
  const { data, isLoading }: ResType = useQuery(["users"], getUsers);

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(["clients"], getClients);

  if (isLoading || clientsLoading) return <Loader />;

  return (
    <Paper sx={{ mt: 2, p: 2, py: 4 }}>
      <Grid container spacing={2}>
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
        <Grid item xs={4}>
          <TextField
            select
            label="Log Hour Type"
            fullWidth
            size="small"
            name="logHourType"
            value={state.type}
            onChange={(e: any) => {
              setState({ ...state, type: e.target.value });
            }}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="GENERAL">General</MenuItem>
            <MenuItem value="TASK">Task</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={4}>
          <TextField
            select
            label="Select Client"
            fullWidth
            size="small"
            name="client"
            value={state.client}
            onChange={(e: any) => {
              setState({ ...state, client: e.target.value });
            }}
          >
            {clients?.data?.result?.map((item: any, index: number) => (
              <MenuItem value={item?.id} key={index}>
                {item?.displayName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" gap={1}>
            <FormControl fullWidth size="small" sx={{ flex: 1 }}>
              <InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
              <Select
                multiple
                value={state.users}
                onChange={(e, v: any) => {
                  setState({ ...state, users: e.target.value as string[] });
                }}
                input={<OutlinedInput label="Employees" />}
                renderValue={(selected) => {
                  return data?.data
                    ?.filter((item: any) => selected.includes(item.id))
                    .map((item: any) => item.fullName)
                    .join(", ");
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: "300px",
                    },
                  },
                }}
              >
                {data?.data?.map((item: any) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    <Checkbox checked={state.users.indexOf(item?.id) > -1} />
                    <ListItemText primary={item?.fullName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.data?.length === state.users.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setState({
                        ...state,
                        users: data?.data?.map((item: any) => item?.id),
                      });
                    } else {
                      setState({ ...state, users: [] });
                    }
                  }}
                  size="small"
                />
              }
              label="Select All"
            />
          </Box>
        </Grid>
      </Grid>
      <Button onClick={onSubmit} color="secondary" variant="contained" sx={{ mt: 3 }}>
        Generate Report
      </Button>
    </Paper>
  );
}

export default Filters;
