import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createReceipt } from "api/services/billing/receipts";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState, selectReceipt } from "redux/reducers/createReceiptSlice";
import { handleError } from "utils/handleError";

function BottomBar() {
  const state = useSelector(selectReceipt);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate } = useMutation(createReceipt, {
    onSuccess: () => {
      dispatch(resetState());
      snack.success("Receipt created successfully");
      queryClient.invalidateQueries("receipts");
      navigate("/billing/receipts");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const isNestedArray = (arr: any) => {
    let isnested = false;
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        isnested = true;
      }
    }
    if (isnested) {
      return arr.flat(1);
    } else {
      return arr;
    }
  }


  const onSubmit = (args: any) => {

    let apiData: any = { ...state };
    if (apiData.receiptDate === "null" || apiData.receiptDate === "") {
      snack.error("please enter receipt date");
    } else if (apiData.paymentDate === "null" || apiData.paymentDate === "") {
      snack.error("please enter payment date");
    } else {
      apiData['invoices'] = apiData?.invoices != null ? isNestedArray(apiData?.invoices) : [];
      if (apiData?.particulars.length > 0 && apiData?.invoices.length > 0) {
        apiData['invoices'] = apiData['invoices'].filter((item: any) => apiData?.particulars.some(itemToBeRemoved => itemToBeRemoved.id === item.id));
        const invoicesum = apiData['invoices'].reduce((total, invoice) => total + (+invoice.pgpayment + +invoice.servicepayment), 0);
        if (invoicesum < (+apiData.amount + +apiData.creditsUsed)) {
          snack.error("Please match amount, credits with pureagent amount and service amount...");
          return;
        }
      }
      // apiData.paymentDate = apiData.receiptDate;
      apiData.amount = +apiData.amount;
      const totalpayment = +apiData.amount + +apiData.creditsUsed;
      // apiData.creditsUsed = +apiData.creditsUsed + (+totalpayment - +invoicesum);

      let idTotalSumcorrect = true;

      if (apiData?.invoices && apiData?.invoices.length > 0) {
        const ids = apiData?.invoices.map((o: any) => o.id);
        const filteredinvoices = apiData?.invoices.filter(({ id }, index) => !ids.includes(id, index + 1));
        const invoicesum = filteredinvoices.reduce((total, invoice) => total + (+invoice.pgpayment + +invoice.servicepayment), 0);

        const balcrditused = (+apiData.previousCredits - +apiData.creditsUsed ) + (totalpayment - (+invoicesum));
        apiData.totalCredits = +apiData.previousCredits == 0 ? (+totalpayment - +invoicesum) : balcrditused;        
        
        const dueinvoicesum = filteredinvoices.reduce((total, invoice) => total + (+invoice.pgdueamount + +invoice.servicedueamount), 0);
        apiData.dueAmount = invoicesum - dueinvoicesum;
        
        if (invoicesum <= totalpayment) {
          idTotalSumcorrect = true;
        } else {
          idTotalSumcorrect = false;
        }
      } else {
        idTotalSumcorrect = false;
      }

      
      if (apiData?.type == "ADVANCE") {
        if (+apiData?.amount > 0) {
          apiData.totalCredits = +apiData.previousCredits + apiData.amount;
          apiData.dueAmount = apiData?.dueAmount == null || apiData?.dueAmount == '' ? 0 : apiData?.dueAmount;
          mutate({
            data: apiData,
          });
        } else {
          snack.error("Enter amount to be greater than 0");
        }
      } else {
        if (idTotalSumcorrect) {
          const ids = apiData?.invoices.map(o => o.id);
          const filteredinvoices = apiData?.invoices.filter(({ id }, index) => !ids.includes(id, index + 1));
          apiData.invoices = filteredinvoices;
          const invoicesum = filteredinvoices.reduce((total, invoice) => total + (+invoice.pgpayment + +invoice.servicepayment), 0);
          const dueinvoicesum = filteredinvoices.reduce((total, invoice) => total + (+invoice.pgdueamount + +invoice.servicedueamount), 0);
          apiData.dueAmount = invoicesum - dueinvoicesum;

          mutate({
            data: apiData,
          });
        } else {
          snack.error("The sum of pureagent and service payment to be less than or equal to " + totalpayment);
        }
      }
    }
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
          onClick={() => navigate("/billing/receipts")}
          color="inherit"
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Box display="flex" gap={1}>
          {/* <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: false })}
            color="secondary"
            variant="contained"
          >
            Save as Draft
          </Button> */}
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: true })}
            color="secondary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
