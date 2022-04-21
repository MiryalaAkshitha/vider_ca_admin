import {
  Box,
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
  let due = invoiceDueDate;

  if (terms === "dueOnReceipt") {
    due = invoiceDate;
  } else if (terms === "net15") {
    due = invoiceDate;
  }

  console.log(invoiceDate);

  return (
    <Grid container mt={5}>
      <Grid item xs={12}>
        <InvoiceHeadings title="Invoice Details" />
        <Grid container sx={{ padding: "30px 0" }}>
          <Box sx={{ width: "40%" }}>
            <TextField
              fullWidth
              id="outlined-basic"
              size="small"
              label="Invoice number"
              variant="outlined"
            />
          </Box>

          <Grid container columnSpacing={3} sx={{ mt: "25px" }}>
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
                  <MenuItem value="dueOnReceipt">Due on Receipt</MenuItem>
                  <MenuItem value="net15">Net 15</MenuItem>
                  <MenuItem value="net30">Net 30</MenuItem>
                  <MenuItem value="net45">Net 45</MenuItem>
                  <MenuItem value="net60">Net 60</MenuItem>
                  <MenuItem value={"dueEndMonth"}>
                    Due end of the month
                  </MenuItem>
                  <MenuItem value={"dueEndNextMonth"}>
                    Due end of the next month
                  </MenuItem>
                  <MenuItem value={"CustomDate"}>Custom Due Date</MenuItem>
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
                value={due}
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
