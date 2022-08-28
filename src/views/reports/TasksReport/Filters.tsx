import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { getCategories } from "api/services/categories";
import { getClients } from "api/services/clients/clients";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { PriorityEnum, TaskStatus } from "data/constants";
import { IState } from "pages/reports/tasks-report";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { getFinancialYears } from "utils/getFinancialYears";

interface Props {
  state: IState;
  setState: (state: IState) => void;
  onSubmit: () => void;
}

function Filters({ state, setState, onSubmit }: Props) {
  const { data, isLoading }: ResType = useQuery(["users"], getUsers);
  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(["clients"], getClients);
  const { data: categories }: ResType = useQuery("categories", getCategories);

  const handleAllUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      return setState({ ...state, users: data?.data });
    }
    setState({ ...state, users: [] });
  };

  let getSubCategories = () => {
    let result: any[] = [];

    state?.category?.forEach((item: any) => {
      if (!item.subCategories) return;
      result = [...result, ...item.subCategories];
    });

    return result;
  };

  if (isLoading || clientsLoading) return <Loader />;

  return (
    <Paper sx={{ mt: 2, p: 2, py: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DatePicker
            label="Created From Date"
            inputFormat="dd-MM-yyyy"
            value={state.fromDate}
            onChange={(v) => setState({ ...state, fromDate: v })}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={4}>
          <DatePicker
            label="Created To Date"
            inputFormat="dd-MM-yyyy"
            value={state.toDate}
            onChange={(v) => setState({ ...state, toDate: v })}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Financial Year"
            select
            size="small"
            fullWidth
            value={state.financialYear}
            onChange={(e) => {
              setState({ ...state, financialYear: e.target.value });
            }}
          >
            {getFinancialYears().map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            disablePortal
            value={state.client}
            onChange={(e, v: any) => setState({ ...state, client: v })}
            options={clients?.data?.result || []}
            getOptionLabel={(option: any) => option?.displayName}
            renderInput={(params) => <TextField {...params} size="small" label="Client" />}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            disablePortal
            multiple
            value={state.category || []}
            onChange={(e, v: any) => setState({ ...state, category: v })}
            options={categories?.data || []}
            getOptionLabel={(option: any) => option?.name}
            renderInput={(params) => <TextField {...params} size="small" label="Category" />}
          />
        </Grid>
        {getSubCategories().length !== 0 && (
          <Grid item xs={4}>
            <Autocomplete
              disablePortal
              multiple
              value={state.subCategory || []}
              onChange={(e, v: any) => setState({ ...state, subCategory: v })}
              options={getSubCategories() || []}
              getOptionLabel={(option: any) => option?.name}
              renderInput={(params) => <TextField {...params} size="small" label="Sub Category" />}
            />
          </Grid>
        )}
        <Grid item xs={4}>
          <TextField
            select
            label="Status"
            fullWidth
            size="small"
            name="status"
            value={state.status}
            onChange={(e: any) => {
              setState({ ...state, status: e.target.value });
            }}
          >
            {Object.values(TaskStatus).map((item, index) => (
              <MenuItem key={index} value={item}>
                {getTitle(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            select
            label="Priority"
            fullWidth
            size="small"
            name="priority"
            value={state.priority}
            onChange={(e: any) => {
              setState({ ...state, priority: e.target.value });
            }}
          >
            {Object.values(PriorityEnum).map((item, index) => (
              <MenuItem key={index} value={item}>
                {getTitle(item)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" gap={1}>
            <Autocomplete
              disablePortal
              multiple
              sx={{ flex: 1 }}
              value={state.users}
              limitTags={3}
              onChange={(e, v: any) => setState({ ...state, users: v })}
              options={data?.data || []}
              getOptionLabel={(option: any) => option?.fullName}
              renderInput={(params) => <TextField {...params} size="small" label="Assignee" />}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={data?.data?.length === state.users.length}
                  onChange={handleAllUsers}
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
