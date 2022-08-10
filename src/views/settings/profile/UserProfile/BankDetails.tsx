import { Grid, TextField } from "@mui/material";
import SectionWrapper from "./SectionWrapper";

const BankDetails = ({ state, setState }) => {
  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <SectionWrapper title="Bank Details">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name="bankAccountHolderName"
            label="Bank account holder name"
            value={state?.bankAccountHolderName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name="bankAccountNumber"
            label="Bank account number"
            value={state?.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name="bankName"
            label="Bank name"
            value={state?.bankName}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            name="bankIfscCode"
            label="Bank IFSC Code"
            value={state?.bankIfscCode}
          />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default BankDetails;
