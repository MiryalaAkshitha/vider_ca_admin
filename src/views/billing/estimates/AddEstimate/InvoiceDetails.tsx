import { Grid, MenuItem, TextField } from "@mui/material";
import { DUE_TERMS } from "data/dueTerms";
import { useDispatch, useSelector } from "react-redux";
import { selectEstimate } from "redux/reducers/createEstimateSlice";
import { handleChange } from "redux/reducers/createInvoiceSlice";
import SectionHeading from "../SectionHeading";

function InvoiceDetails() {
  const { invoiceDate, invoiceDueDate, terms } = useSelector(selectEstimate);
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
        <SectionHeading title="Estimate Details" />
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              label="Estimate number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Estimate Date"
              variant="outlined"
              value={invoiceDate}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              size="small"
              label="Terms"
              variant="outlined"
            >
              {DUE_TERMS.map((item, index) => (
                <MenuItem value={item.value} key={index}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
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
  );
}

export default InvoiceDetails;
