import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Section from "./Section";

function InvoiceParticulars({ invoiceData }) {
  return (
    <Section title="Invoice Particulars">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Pure Agent Amount"
            variant="outlined"
            disabled
            size="small"
            value={invoiceData?.totalCharges || 0}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Pure Agent Due Amount"
            variant="outlined"
            disabled
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Paid Pure Agent Amount"
            variant="outlined"
            name="pureAgentDueAmount"
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={<Typography variant="body2">Pay in full</Typography>}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Service Amount"
            variant="outlined"
            disabled
            size="small"
            value={invoiceData?.subTotal || 0}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Service Due Amount"
            variant="outlined"
            disabled
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Paid Service Amount"
            variant="outlined"
            name="pureAgentDueAmount"
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={<Typography variant="body2">Pay in full</Typography>}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" mt={1}>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="GST Amount"
            variant="outlined"
            disabled
            size="small"
            value={invoiceData?.totalGstAmount || 0}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="GST Due Amount"
            variant="outlined"
            disabled
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Paid GST Amount"
            variant="outlined"
            name="pureAgentDueAmount"
            size="small"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={<Typography variant="body2">Pay in full</Typography>}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default InvoiceParticulars;
