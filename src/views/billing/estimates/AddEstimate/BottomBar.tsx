import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createInvoice } from "api/services/invoicing";
import { snack } from "components/toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectInvoice } from "redux/reducers/createInvoiceSlice";
import { InvoiceCalculations } from "../calculations";

function BottomBar() {
  const state = useSelector(selectInvoice);
  const navigate = useNavigate();

  const { mutate } = useMutation(createInvoice, {
    onSuccess: () => {
      snack.success("Estimate created successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  let iCalcs = new InvoiceCalculations(state);

  const onSubmit = () => {
    let apiData: any = { ...state };
    apiData.tdsAmount = iCalcs.tdsAmount();
    apiData.totalTaxableAmount = iCalcs.totalTaxableAmount();
    apiData.totalGstAmount = iCalcs.totalIgstAmount();
    apiData.subTotal = iCalcs.totalAmount();
    apiData.additionalCharges = iCalcs.additionalCharges();
    apiData.grandTotal = iCalcs.grandTotal();
    apiData.particulars = state.particulars.map((p: any) => {
      return {
        ...p,
        taxableAmount: iCalcs.getTaxableAmount(p),
        gstAmount: iCalcs.getIgstAmount(p),
        amount: iCalcs.getAmount(p),
      };
    });

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
          maxWidth: 1200,
          py: 2,
          margin: "auto",
        }}
      >
        <Box>
          <Button
            disableElevation
            onClick={onSubmit}
            color="secondary"
            variant="contained"
          >
            Save and send
          </Button>
          <Button
            onClick={() => navigate("/billing/estimates")}
            color="inherit"
            variant="contained"
            disableElevation
            sx={{ ml: "20px" }}
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
