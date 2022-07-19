import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectInvoice } from "redux/reducers/createInvoiceSlice";
import { InvoiceCalculations } from "../calculations";

function TotalCalculations() {
  const state = useSelector(selectInvoice);
  const dispatch = useDispatch();
  const [showTds, setShowTds] = useState(false);
  const [showOtherCharges, setShowOtherCharges] = useState(false);

  const iCalcs = new InvoiceCalculations(state);

  return (
    <Box
      sx={{
        backgroundColor: "#f3f5fa",
      }}
    >
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Typography sx={{ flex: 1 }} variant="body1">
                Sub Total
              </Typography>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              {iCalcs.totalAmount()} /-
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="3px" alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Typography variant="body2">
                Pure Agent/Additional Charges
              </Typography>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              {iCalcs.additionalCharges()}/-
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="3px" alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" gap={1} alignItems="center">
              <FormGroup sx={{ flex: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setShowTds(e.target.checked);
                      }}
                      color="secondary"
                    />
                  }
                  label="Add TDS"
                />
              </FormGroup>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" flex={1} gap={1}>
              <TextField
                fullWidth
                select
                onChange={(e) => {
                  dispatch(
                    handleChange({
                      key: "tdsPercent",
                      value: +e.target.value,
                    })
                  );
                }}
                disabled={!showTds}
                variant="standard"
                SelectProps={{ native: true }}
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10% </option>
              </TextField>
              <TextField
                value={iCalcs.tdsAmount()}
                fullWidth
                disabled
                type="number"
                variant="standard"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="flex-end">
          <Grid item xs={6}>
            <Box display="flex" gap={1} alignItems="center">
              <FormGroup sx={{ flex: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setShowOtherCharges(e.target.checked);
                      }}
                      color="secondary"
                    />
                  }
                  label="Other Charges"
                />
              </FormGroup>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <TextField
                disabled={!showOtherCharges}
                onChange={(e) => {
                  dispatch(
                    handleChange({
                      key: "otherCharges",
                      value: +e.target.value,
                    })
                  );
                }}
                fullWidth
                type="number"
                variant="standard"
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt="3px" alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                +/- Round off
              </Typography>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">{state.roundOff}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Box display="flex" gap={1}>
              <Typography sx={{ flex: 1 }} variant="body1">
                Invoice Value
              </Typography>
              <span>:</span>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">
              {iCalcs.grandTotal()} /-
            </Typography>
          </Grid>
        </Grid>
        <Typography sx={{ mt: 3 }}>
          Rupees Five Thousand Five Hundred Only
        </Typography>
      </Box>
    </Box>
  );
}

export default TotalCalculations;
