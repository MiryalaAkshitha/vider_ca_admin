import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { addExpenditure } from "api/services/expenditure";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, SubmitType } from "types";

function AddExpenditure({ open, setOpen }: DialogProps) {
  const params: any = useParams();
  const queryClient = useQueryClient();

  const [state, setState] = useState({
    type: "",
    particularName: "",
    amount: "",
    includeInInvoice: false,
    attachment: "",
  });

  const { mutate, isLoading } = useMutation(addExpenditure, {
    onSuccess: () => {
      snack.success("Expenditure Added");
      setOpen(false);
      queryClient.invalidateQueries("expenditure");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      ...state,
      taskId: +params.taskId,
      amount: +state.amount,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Expenditure" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          row
          onChange={(e) => {
            setState({ ...state, type: e.target.value });
          }}
          value={state.type}
          name="type"
        >
          <FormControlLabel
            control={<Radio required value="PURE_AGENT" />}
            label="Pure agent"
          />
          <FormControlLabel
            control={<Radio required value="ADDITIONAL" />}
            label="Additional Charges"
          />
        </RadioGroup>
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => {
            setState({ ...state, particularName: e.target.value });
          }}
          size="small"
          value={state.particularName}
          name="name"
          label="Particular name"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => {
            setState({ ...state, amount: e.target.value });
          }}
          size="small"
          value={state.amount}
          name="name"
          label="Amount"
          type="number"
          required
        />
        <FormControlLabel
          onChange={(e: any) => {
            setState({ ...state, includeInInvoice: e.target.checked });
          }}
          checked={state.includeInInvoice}
          sx={{ mt: 2 }}
          control={<Checkbox />}
          label="Include in invoice"
        />
        <UploadImage
          sx={{ mt: 2 }}
          name="image"
          label="Click here to upload an attachment"
          onChange={(v) => {
            setState({ ...state, attachment: v });
          }}
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Add Expenditure"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default AddExpenditure;