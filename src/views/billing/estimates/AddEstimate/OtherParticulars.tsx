import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
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
  const dispatch = useDispatch();
  const state = useSelector(selectEstimate);

  function updateOtherParticular(index: number, key: string, value: any) {
    dispatch(handleChangeOtherParticular({ index, key, value }));
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
              <TableCell>
                <Typography>Particulars</Typography>
              </TableCell>
              <TableCell>
                <Typography>Type</Typography>
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
                      variant="standard"
                      type="text"
                      placeholder="Name of the Particular"
                      value={data.name}
                      onChange={(e) => {
                        updateOtherParticular(index, "name", e.target.value);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      variant="standard"
                      value={data.type}
                      select
                      sx={{ mt: -1 }}
                      label="Select Type"
                      onChange={(e) => {
                        updateOtherParticular(index, "type", e.target.value);
                      }}
                    >
                      <MenuItem value="PURE_AGENT">Pure Agent</MenuItem>
                      <MenuItem value="ADDITIONAL">Additional</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      placeholder="Enter Amount"
                      variant="standard"
                      type="number"
                      value={data.amount}
                      onChange={(e) => {
                        updateOtherParticular(index, "amount", e.target.value);
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
