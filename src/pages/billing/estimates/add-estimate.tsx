import { Typography } from "@mui/material";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetState } from "redux/reducers/createEstimateSlice";
import BankDetails from "views/billing/estimates/AddEstimate/BankDetails";
import BillingEntityDetails from "views/billing/estimates/AddEstimate/BillingEntityDetails";
import BottomBar from "views/billing/estimates/AddEstimate/BottomBar";
import ClientDetails from "views/billing/estimates/AddEstimate/ClientDetails";
import EstimateDetails from "views/billing/estimates/AddEstimate/EstimateDetails";
import OtherParticulars from "views/billing/estimates/AddEstimate/OtherParticulars";
import Particulars from "views/billing/estimates/AddEstimate/Particulars";
import TermsAndConditions from "views/billing/estimates/AddEstimate/TermsAndConditions";
import { StyledNewEstimateContainer } from "views/billing/styles";

const AddEstimate = () => {
  const dispatch = useDispatch();
  useTitle("New Estimate");

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetState());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <StyledNewEstimateContainer>
        <Typography textAlign="center" mb={4} variant="h5">
          ESTIMATE
        </Typography>
        <BillingEntityDetails />
        <ClientDetails />
        <EstimateDetails />
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
