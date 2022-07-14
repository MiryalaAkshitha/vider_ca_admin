import { Grid } from "@mui/material";
import Detail from "./Detail";
import SectionWrapper from "./SectionWrapper";

const BankDetails = ({ data }) => {
  return (
    <SectionWrapper title="Bank Details">
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={3}>
          <Detail
            title="Bank account number"
            value={data?.profile?.bankAccountNumber}
          />
        </Grid>
        <Grid item xs={3}>
          <Detail
            title="Bank account holder name"
            value={data?.profile?.bankAccountHolderName}
          />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Bank name" value={data?.profile?.bankName} />
        </Grid>
        <Grid item xs={3}>
          <Detail title="Bank IFSC Code" value={data?.profile?.bankIfscCode} />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
};

export default BankDetails;
