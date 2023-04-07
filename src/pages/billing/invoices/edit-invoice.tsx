import { Typography } from "@mui/material";
import { getInvoicePreview } from "api/services/billing/invoices";
import useQueryParams from "hooks/useQueryParams";
import useTitle from "hooks/useTitle";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetState } from "redux/reducers/createEstimateSlice";
import { ResType } from "types";
import BankDetails from "views/billing/estimates/EditEstimate/BankDetails";
import BillingEntityDetails from "views/billing/estimates/EditEstimate/BillingEntityDetails";
import BottomBar from "views/billing/estimates/EditEstimate/BottomBar";
import ClientDetails from "views/billing/estimates/EditEstimate/ClientDetails";
import InvoiceDetails from "views/billing/estimates/EditEstimate/InvoiceDetails";
import OtherParticulars from "views/billing/estimates/EditEstimate/OtherParticulars";
import Particulars from "views/billing/estimates/EditEstimate/Particulars";
import TermsAndConditions from "views/billing/estimates/EditEstimate/TermsAndConditions";
import { StyledNewEstimateContainer } from "views/billing/styles";

const EditInvoice = () => {
  const dispatch = useDispatch();
  useTitle("Edit Invoice");

  const [result, setResult] = useState();

  const params = useParams();
  const { queryParams } = useQueryParams();

  const { data, isLoading }: ResType = useQuery(
    ["invoice-details", params.invoiceId],
    getInvoicePreview, {
    onSuccess: (res: any) => {
      setResult(res?.data);
    }
  }
  );

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  return (
    <>
      <StyledNewEstimateContainer>
        <Typography textAlign="center" mb={4} variant="h5">
          Invoice
        </Typography>
        {result && <>
          <BillingEntityDetails result={result} />
          <ClientDetails result={result} />
          <InvoiceDetails result={result} />
          <Particulars result={result} />
          <OtherParticulars result={result} />
          <BankDetails result={result} />
          <TermsAndConditions result={result} />
        </>
        }
      </StyledNewEstimateContainer>
      <BottomBar result={result} />
    </>
  );
};
export default EditInvoice;
