import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { createLink } from "api/services/storage";
import { icons } from "assets";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps } from "types";
import { handleError } from "utils/handleError";
import { GreyButton } from "views/tasks/styles";

interface Props extends DialogProps {
  type: "client" | "organization";
  clientId: string | null;
}

function LocalStorage({ open, setOpen, type, clientId }: Props) {
  const params = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const [state, setState] = useState({ name: "", file: "" });

  const { mutate } = useMutation(createLink, {
    onSuccess: (res: any) => {
      setOpen(false);
      queryClient.invalidateQueries("storage");
      setQueryParams({ ...queryParams, tab: "links" });
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
      folderId: queryParams.folderId || "",
      clientId,
      type,
    });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" gap={1} alignItems="center">
            <img src={icons.onedrive} alt="" />
            One Drive
          </Box>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
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
          <Box display="flex" mt={4} justifyContent="center" gap={2}>
            <GreyButton
              variant="contained"
              type="button"
              disableElevation
              onClick={() => setOpen(false)}
            >
              Cancel
            </GreyButton>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disableElevation
            >
              Submit
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LocalStorage;
