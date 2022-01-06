import { Box, Button, TextField } from "@mui/material";
import { createDDForm } from "api/services/tasks";
import DialogWrapper from "components/DialogWrapper";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, SubmitType } from "types";

function AddPage({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const snack = useSnack();
  const [name, setName] = useState("");

  const { mutate } = useMutation(createDDForm, {
    onSuccess: () => {
      snack.success("Page created successfully");
      setName("");
      queryClient.invalidateQueries("dd-forms");
      setOpen(false);
    },
    onError: () => {
      snack.error("Error creating form");
      setOpen(false);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({ data: { name, taskId: params.taskId } });
    setOpen(false);
  };

  return (
    <DialogWrapper title="New Page" open={open} setOpen={setOpen}>
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
