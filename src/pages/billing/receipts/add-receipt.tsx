import { Typography } from "@mui/material";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, selectReceipt } from "redux/reducers/createReceiptSlice";
import AdvanceDetails from "views/billing/receipts/AddReceipt/AddvanceDetails";
import ClientInvoiceDetails from "views/billing/receipts/AddReceipt/ClientInvoiceDetails";
import BasicDetails from "views/billing/receipts/AddReceipt/BasicDetails";
import BottomBar from "views/billing/receipts/AddReceipt/BottomBar";
import { StyledNewEstimateContainer } from "views/billing/styles";

function AddReceipt() {
  const dispatch = useDispatch();
  useTitle("New Receipt");
  const { type, client } = useSelector(selectReceipt);

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetState());
    }, 500);
  }, [dispatch]);

  return (
    <>
      <StyledNewEstimateContainer sx={{ minHeight: "90vh" }}>
        <Typography textAlign="center" mb={4} variant="h5">
          Receipt
        </Typography>
        <BasicDetails />
        {type === "INVOICE" && client && <ClientInvoiceDetails />}
        {type === "ADVANCE" && client && <AdvanceDetails />}
      </StyledNewEstimateContainer>
      <BottomBar />
    </>
  );
}

export default AddReceipt;
