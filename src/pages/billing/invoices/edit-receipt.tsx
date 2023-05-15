import { Typography } from "@mui/material";
import useTitle from "hooks/useTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, resetState, selectReceipt } from "redux/reducers/createReceiptSlice";
import { StyledNewEstimateContainer } from "views/billing/styles";
import { getInvoice, getInvoicePreview } from "api/services/billing/invoices";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import BottomBar from "views/billing/receipts/AddReceipt/BottomBar";
// import ClientInvoiceDetails from "views/billing/receipts/AddReceipt/ClientInvoiceDetails";
import ClientInvoiceDetails from "views/billing/invoices/EditReceipt/ClientInvoiceDetails";
import BasicDetails from "views/billing/invoices/EditReceipt/BasicDetails";

function EditReceipt() {
    useTitle("New Receipt");
    const dispatch = useDispatch();

    const state = useSelector(selectReceipt);

    const params = useParams();
    const { queryParams } = useQueryParams();

    const { data, isLoading }: ResType = useQuery(
        ["invoice-details", params.invoiceId],
        getInvoicePreview,
        {
            onSuccess: (res: any) => {
                dispatch(resetState());
                setTimeout((response: any, cstate: any) => {
                    if (response?.data?.client && response?.data?.client?.id) {
                        dispatch(handleChange({ key: "client", value: response?.data?.client?.id }));
                    }
                    dispatch(handleChange({ key: 'particulars', value: cstate.particulars }));
                }, 500, res, state);
            },
        }
    );

    return (
        <>
            <StyledNewEstimateContainer sx={{ minHeight: "90vh" }}>
                <Typography textAlign="center" mb={4} variant="h5">
                    Payment Receipt
                    {/* {data?.data?.invoiceNumber} */}
                </Typography>
                <BasicDetails />
                {state.type === "INVOICE" && state.client && <ClientInvoiceDetails invoicedate={state.particulars} />}

            </StyledNewEstimateContainer>
            <BottomBar />
        </>
    );
}

export default EditReceipt;
