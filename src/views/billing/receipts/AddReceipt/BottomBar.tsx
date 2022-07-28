import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { createReceipt } from "api/services/billing/receipts";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectReceipt } from "redux/reducers/createReceiptSlice";
import { handleError } from "utils/handleError";

function BottomBar() {
  const state = useSelector(selectReceipt);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(createReceipt, {
    onSuccess: () => {
      snack.success("Receipt created successfully");
      queryClient.invalidateQueries("receipts");
      navigate("/billing/receipts");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onSubmit = (args: any) => {
    let apiData: any = { ...state };

    apiData.amount = +apiData.amount;
    apiData.totalCredits = +apiData.previousCredits + +apiData.amount;

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
          onClick={() => navigate("/billing/receipts")}
          color="inherit"
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Box display="flex" gap={1}>
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: false })}
            color="secondary"
            variant="contained"
          >
            Save as Draft
          </Button>
          <Button
            disableElevation
            onClick={() => onSubmit({ submitForApproval: true })}
            color="secondary"
            variant="contained"
          >
            Save and Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default BottomBar;
