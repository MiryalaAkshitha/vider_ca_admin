import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createInvoice } from "api/services/invoicing";
import { snack } from "components/toast";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectInvoice } from "redux/reducers/createInvoiceSlice";
import { InvoiceCalculations } from "./calculations";

function BottomBar() {
  const state = useSelector(selectInvoice);
  const navigate = useNavigate()

  const { mutate } = useMutation(createInvoice, {
    onSuccess: () => {
      snack.success("Invoice created successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handlePreviewClick = () => {
    navigate("/invoicing/estimate-preview")
  }

  const handleCancelClick = () => {
    navigate("/invoicing/estimates")
  }

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
            onClick={onSubmit}
            size="large"
            color="secondary"
            variant="contained"
          >
            Save and send
          </Button>
          <Button
            onClick={handleCancelClick}
            size="large"
            color="inherit"
            variant="contained"
            sx={{ ml: "20px" }}
          >
            Cancel
          </Button>
        </Box>
        <Box>
          <Button size="large" color="secondary" onClick={handlePreviewClick}>
            Preview
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
