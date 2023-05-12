import { Typography } from "@mui/material";
import { getInvoicePreview } from "api/services/billing/invoices";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetState, selectReceipt } from "redux/reducers/createReceiptSlice";
import { ResType } from "types";
import AdditionalInformation from "views/billing/invoices/CreateReceipt/AdditionalInformation";
import BasicDetails from "views/billing/invoices/CreateReceipt/BasicDetails";
import InvoiceParticulars from "views/billing/invoices/CreateReceipt/InvoiceParticulars";
import PaymentDetails from "views/billing/invoices/CreateReceipt/PaymentDetails";
import PaymentSummary from "views/billing/invoices/CreateReceipt/PaymentSummar";
import TotalAmount from "views/billing/invoices/CreateReceipt/TotalAmount";
import BottomBar from "views/billing/receipts/AddReceipt/BottomBar";
import { StyledNewEstimateContainer } from "views/billing/styles";

function AddReceipt() {
  const params = useParams();
  const dispatch = useDispatch();
  useTitle("New Receipt");

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetState());
    }, 500);    
  }, [dispatch]);

  const { data, isLoading }: ResType = useQuery(
    ["invoice-details", params.invoiceId],
    getInvoicePreview,
    {
      onSuccess: (res: any) => {},
    }
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <StyledNewEstimateContainer sx={{ minHeight: "90vh" }}>
        <Typography textAlign="center" mb={4} variant="h5">
          Payment Receipt 
          {/* {data?.data?.invoiceNumber} */}
        </Typography>
        <BasicDetails invoiceData={data?.data} />
        <PaymentDetails invoiceData={data?.data} />
        <TotalAmount invoiceData={data?.data} />
        <InvoiceParticulars invoiceData={data?.data} />
        <AdditionalInformation />
        <PaymentSummary />
      </StyledNewEstimateContainer>
      <BottomBar />
    </>
  );
}

export default AddReceipt;
