import { Box, TextField } from "@mui/material";
import { createLink } from "api/services/storage";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { handleError } from "utils/handleError";
import { GreyButton } from "views/tasks/styles";

interface Props {
  setOpen: (open: boolean) => void;
}

function AddOneDriveLink({ setOpen }: Props) {
  const params: any = useParams();
  const queryClient = useQueryClient();
  const [state, setState] = useState({ name: "", file: "" });

  const { mutate, isLoading } = useMutation(createLink, {
    onSuccess: (res: any) => {
      setOpen(false);
      queryClient.invalidateQueries("task-attachments");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      name: state.name,
      file: state.file,
      type: "task",
      taskId: +params.taskId,
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="One drive link title"
          variant="outlined"
          fullWidth
          sx={{ mt: 1 }}
          size="small"
          required
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          label="One drive link"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          size="small"
          type="url"
          required
          name="file"
          value={state.file}
          onChange={handleChange}
        />
        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
          <LoadingButton
            title="Add Link"
            disableElevation
            loading={isLoading}
            color="secondary"
            type="submit"
          />
          <GreyButton onClick={() => setOpen(false)}>Cancel</GreyButton>
        </Box>
      </form>
    </Box>
  );
}

export default AddOneDriveLink;
