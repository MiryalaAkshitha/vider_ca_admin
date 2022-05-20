import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createInvoice } from "api/services/invoicing";
import { snack } from "components/toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { selectInvoice } from "redux/reducers/createInvoiceSlice";
import { InvoiceCalculations } from "./calculations";
import { useNavigate } from "react-router-dom";

function BottomBar() {
  const navigate = useNavigate();
  const state = useSelector(selectInvoice);

  const { mutate } = useMutation(createInvoice, {
    onSuccess: () => {
      snack.success("Invoice created successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  let iCalcs = new InvoiceCalculations(state);

  const handleSaveASDraft = () => {
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

  const handleSaveAndSend = () => {
    navigate(`/invoicing/send-email`);

  }

  const PreviewPage = () => {
    navigate(`/invoicing/invoice-preview`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: "100",
      }}
    >
      <Box
        maxWidth={1400}
        margin="auto"
        p={2}
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Button
            onClick={handleSaveASDraft}
            size="large"
            variant="contained"
            color="inherit"
          >
            Save as Draft
          </Button>
          <Button
            onClick={handleSaveAndSend}
            size="large"
            color="secondary"
            variant="contained"
            sx={{ marginLeft: "25px" }}
          >
            Save and send
          </Button>
        </Box>
        <Box>
          <Button size="large" color="secondary" onClick={PreviewPage}>
            Preview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
