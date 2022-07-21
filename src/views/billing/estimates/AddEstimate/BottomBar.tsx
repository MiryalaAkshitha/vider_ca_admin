import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createEstimate } from "api/services/billing";
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
  getTotalGst,
  getTotalIgst,
  getTotalCharges,
} from "../calculations";

function BottomBar() {
  const queryClient = useQueryClient();
  const state = useSelector(selectEstimate);
  const navigate = useNavigate();

  const { mutate } = useMutation(createEstimate, {
    onSuccess: () => {
      snack.success("Estimate created successfully");
      queryClient.invalidateQueries("estimates");
      navigate("/billing/estimates");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onSubmit = (args: any) => {
    let apiData: any = { ...state };
    let totalGstAmount = state.interState
      ? getTotalGst(state.particulars)
      : getTotalIgst(state.particulars);

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
        igst: item?.igst?.value,
        cgst: item?.cgst?.value,
        sgst: item?.sgst?.value,
        ...(state.interState && {
          igst: null,
        }),
        ...(!state.interState && {
          cgst: null,
          sgst: null,
        }),
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
        <Box display="flex" gap={1}>
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: true })}
            color="secondary"
            variant="contained"
          >
            Submit for Approval
          </Button>
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: false })}
            color="secondary"
            variant="contained"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => navigate("/billing/estimates")}
            color="inherit"
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => navigate("/billing/estimates/estimate-preview")}
            size="large"
            color="secondary"
          >
            Preview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
