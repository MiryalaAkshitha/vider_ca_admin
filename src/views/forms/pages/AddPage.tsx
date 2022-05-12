import { Box, Button, TextField } from "@mui/material";
import { addPage } from "api/services/forms";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectForms, setAddPageOpen } from "redux/reducers/formsSlice";
import { SubmitType } from "types";

function AddPage() {
  const queryClient = useQueryClient();
  const params = useParams();

  const [name, setName] = useState("");
  const { addPageOpen } = useSelector(selectForms);
  const dispatch = useDispatch();

  const { mutate } = useMutation(addPage, {
    onSuccess: () => {
      snack.success("Page added");
      setName("");
      queryClient.invalidateQueries("form-details");
      dispatch(setAddPageOpen(false));
    },
    onError: () => {
      snack.error("Error creating page");
      dispatch(setAddPageOpen(false));
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({ formId: params.formId, name });
  };

  return (
    <DialogWrapper
      title="New Page"
      open={addPageOpen}
      setOpen={(v) => dispatch(setAddPageOpen(v))}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          size="small"
          variant="outlined"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          label="Page Name"
          fullWidth
        />
        <Box textAlign="right">
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Create Page
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default AddPage;
