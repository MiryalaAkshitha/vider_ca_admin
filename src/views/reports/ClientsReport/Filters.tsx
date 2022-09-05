import { DatePicker } from "@mui/lab";
import { Box, Button, Grid, MenuItem, Paper, TextField } from "@mui/material";
import { CLIENT_CATEGORIES } from "data/constants";
import { IState } from "pages/reports/clients-report";

interface Props {
  state: IState;
  setState: (state: IState) => void;
  onSubmit: () => void;
}

function Filters({ state, setState, onSubmit }: Props) {
  let subCategories = CLIENT_CATEGORIES.find(
    (item) => item.value === state.category
  )?.subCategories;

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
            <MenuItem value="All">ALL</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={4}>
          <TextField
            select
            label="Category"
            fullWidth
            size="small"
            name="category"
            value={state.category}
            onChange={(e: any) => {
              setState({ ...state, category: e.target.value, subCategory: "" });
            }}
          >
            {CLIENT_CATEGORIES.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {subCategories && (
          <Grid item xs={4}>
            <TextField
              select
              label="Sub Category"
              fullWidth
              size="small"
              name="subCategory"
              value={state.subCategory}
              onChange={(e: any) => {
                setState({ ...state, subCategory: e.target.value });
              }}
            >
              {subCategories.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
      </Grid>
      <Button onClick={onSubmit} sx={{ mt: 3 }} color="secondary" variant="contained">
        Generate Report
      </Button>
    </Paper>
  );
}

export default Filters;
