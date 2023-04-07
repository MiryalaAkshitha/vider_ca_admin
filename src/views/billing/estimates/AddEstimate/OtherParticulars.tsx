import ClearIcon from "@mui/icons-material/Clear";
import { Autocomplete, Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddOtherParticular,
  handleChangeOtherParticular,
  handleRemoveOtherParticular,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import { StyledParticularsTable } from "views/billing/styles";
import TotalCalculations from "./TotalCalculations";

function OtherParticulars() {
  const Types = ['PURE_AGENT', 'ADDITIONAL'];

  const dispatch = useDispatch();
  const state = useSelector(selectEstimate);

  function updateOtherParticular(id: number, index: number, key: string, value: any) {
    dispatch(handleChangeOtherParticular({ id, index, key, value, taskExpenseType: ""}));
  }

  function addOtherParticular() {
    dispatch(handleAddOtherParticular());
  }

  function removeOtherParticular(index) {
    dispatch(handleRemoveOtherParticular(index));
  }

  return (
    <Grid container mt={3} spacing={2}>
      <Grid item xs={6}>
        <StyledParticularsTable>
          <TableHead>
            <TableRow>
              <TableCell>Expense Type</TableCell>
              <TableCell>
                {/* <Typography>Services as a Pure Agent</Typography> */}
                <Typography>Particulars</Typography>
              </TableCell>
              <TableCell>
                <Typography>Amount</Typography>
              </TableCell>
              <TableCell sx={{ width: "80px" }}>
                <Typography>Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.otherParticulars.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      label="Expenditure type"
                      sx={{ mt: 2 }}
                      variant="outlined"
                      name="expenditureType"
                      onChange={(e: any) => {
                        updateOtherParticular(data?.id, index, "taskExpenseType", e.target.value);
                      }}
                      value={data?.taskExpenseType}
                      fullWidth
                    // onChange={handleChange}
                    >
                      {Types.map((i) => (
                        <MenuItem key={i} value={i}>
                          {i}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Name of the Particular"
                      value={data.name}
                      onChange={(e) => {
                        updateOtherParticular(data?.id, index, "name", e.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Enter Amount"
                      variant="standard"
                      type="number"
                      value={data.amount}
                      onChange={(e) => {
                        updateOtherParticular(data?.id, index, "amount", e.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="secondary">
                      <ClearIcon onClick={() => removeOtherParticular(index)} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </StyledParticularsTable>
        <Button sx={{ mt: 2 }} color="secondary" onClick={addOtherParticular}>
          + Add New
        </Button>
      </Grid>
      <Grid item xs={6}>
        <TotalCalculations />
      </Grid>
    </Grid>
  );
}

export default OtherParticulars;
