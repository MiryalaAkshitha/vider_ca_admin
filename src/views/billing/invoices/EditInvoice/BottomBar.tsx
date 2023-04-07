import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createInvoice } from "api/services/billing/invoices";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectEstimate } from "redux/reducers/createEstimateSlice";
import { handleError } from "utils/handleError";
import {
  getAmount,
  getGrandTotal,
  getRoundOff,
  getSubTotal,
  getTotalCharges,
  getTotalGst,
} from "../../estimates/calculations";

function BottomBar() {
  const queryClient = useQueryClient();
  const state = useSelector(selectEstimate);
  const navigate = useNavigate();

  const { mutate } = useMutation(createInvoice, {
    onSuccess: () => {
      snack.success("Invoice created successfully");
      queryClient.invalidateQueries("estimates");
      navigate("/billing/invoices");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onSubmit = (args: any) => {
    const newstate = JSON.parse(JSON.stringify(state));
    newstate.shippingAddress['state'] = 'Telangana';
    newstate.billingAddress['state'] = 'Telangana';
    
    let apiData: any = { ...newstate };
    let totalGstAmount = getTotalGst(state.particulars);

    apiData.invoiceNumber = state.estimateNumber;
    apiData.invoiceNumberType = state.estimateNumberType;
    apiData.invoiceDate = state.estimateDate;
    apiData.invoiceDueDate = state.estimateDueDate;
    apiData.approvalHierarchyId = state.approvalHierarchy?.id;
    apiData.subTotal = getSubTotal(state.particulars);
    apiData.totalGstAmount = totalGstAmount;
    apiData.adjustment = +state.adjustment;
    apiData.totalCharges = getTotalCharges(state.otherParticulars);
    apiData.roundOff = getRoundOff(state);
    apiData.grandTotal = getGrandTotal(state);
    apiData.particulars = state.particulars.map((item: any) => {
      return {
        ...item,
        amount: getAmount(item),
        gst: item?.gst?.value,
      };
    });
    apiData.submitForApproval = args.submitForApproval;

    mutate({
      data: apiData,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        left: "72px",
        width: "calc(100% - 72px)",
        zIndex: "100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1400,
          width: "95%",
          py: 2,
          margin: "auto",
        }}
      >
        <Button
          onClick={() => navigate("/billing/estimates")}
          color="inherit"
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Box display="flex" gap={1}>
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: true })}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
          {/* <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: false })}
            color="secondary"
            variant="contained"
          >
            Save as Draft
          </Button> */}
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
