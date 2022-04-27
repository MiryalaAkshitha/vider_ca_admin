import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectInvoice } from "redux/reducers/createInvoiceSlice";
import InvoiceHeadings from "./InvoiceHeadings";

function InvoiceDetails() {
  const { invoiceDate, invoiceDueDate, terms } = useSelector(selectInvoice);
  const dispatch = useDispatch();

  const handleDetailChange = (key: string, value: string | null) => {
    dispatch(
      handleChange({
        key,
        value,
      })
    );
  };

  return (
    <Grid container mt={5}>
      <Grid item xs={12}>
        <InvoiceHeadings title="Invoice Details" />
        <Grid container sx={{ padding: "30px 0" }}>
          <Grid container columnSpacing={3}>
            <Grid item xs={4}>
              <TextField
                size="small"
                fullWidth
                id="date"
                type={"date"}
                InputLabelProps={{ shrink: true }}
                label="Invoice Date"
                variant="outlined"
                value={invoiceDate}
                onChange={(e) => {
                  handleDetailChange("invoiceDate", e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="terms">Terms</InputLabel>
                <Select
                  labelId="terms"
                  id="demo-simple-select-helper"
                  value={terms}
                  onChange={(e) => {
                    handleDetailChange("terms", e.target.value);
                  }}
                  label="Terms"
                >
                  <MenuItem value="term0">Net 30</MenuItem>
                  <MenuItem value={"term1"}>Vider Soft</MenuItem>
                  <MenuItem value={"term2"}>Vider Softawre</MenuItem>
                  <MenuItem value={"term3"}>Vider Software Solutions</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="dueDate"
                type={"date"}
                InputLabelProps={{ shrink: true }}
                label="Due Date"
                size="small"
                variant="outlined"
                value={invoiceDueDate}
                onChange={(e) => {
                  handleDetailChange("invoiceDueDate", e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InvoiceDetails;
