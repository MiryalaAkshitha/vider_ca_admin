import { Typography } from "@mui/material";
import useTitle from "hooks/useTitle";
import BankDetails from "views/billing/estimates/AddEstimate/BankDetails";
import BillingEntityDetails from "views/billing/estimates/AddEstimate/BillingEntityDetails";
import BottomBar from "views/billing/estimates/AddEstimate/BottomBar";
import ClientDetails from "views/billing/estimates/AddEstimate/ClientDetails";
import InvoiceDetails from "views/billing/estimates/AddEstimate/InvoiceDetails";
import OtherParticulars from "views/billing/estimates/AddEstimate/OtherParticulars";
import Particulars from "views/billing/estimates/AddEstimate/Particulars";
import TermsAndConditions from "views/billing/estimates/AddEstimate/TermsAndConditions";
import { StyledNewEstimateContainer } from "views/billing/styles";

const AddEstimate = () => {
  useTitle("New Estimate");

  return (
    <>
      <StyledNewEstimateContainer>
        <Typography textAlign="center" mb={4} variant="h5">
          ESTIMATE
        </Typography>
        <BillingEntityDetails />
        <ClientDetails />
        <InvoiceDetails />
        <Particulars />
        <OtherParticulars />
        <BankDetails />
        <TermsAndConditions />
      </StyledNewEstimateContainer>
      <BottomBar />
    </>
  );
};
export default AddEstimate;
