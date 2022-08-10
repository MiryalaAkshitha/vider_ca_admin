import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateExpenditure } from "api/services/expenditure";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import UploadImage from "components/UploadImage";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface Props extends DialogProps {
  data: any;
}

function EditExpenditure({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    taskExpenseType: "",
    particularName: "",
    amount: "",
    includeInInvoice: false,
    attachment: "",
  });

  useEffect(() => {
    if (open) {
      setState(data);
    }
  }, [data, open]);

  const { mutate, isLoading } = useMutation(updateExpenditure, {
    onSuccess: () => {
      snack.success("Expenditure updated");
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
      id: data?.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Edit Expenditure" setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          row
          onChange={(e) => {
            setState({ ...state, taskExpenseType: e.target.value });
          }}
          value={state.taskExpenseType}
          name="taskExpenseType"
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
            title="Update Expenditure"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditExpenditure;
