import { Button, Dialog, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createFolder } from "api/services/storage";
import { snack } from "components/toast";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { DialogProps } from "types";

interface IProps extends DialogProps {
  type: "client" | "organization";
}

const CreateFolderDialog = ({ open, setOpen, type }: IProps) => {
  const [name, setName] = useState<string>("Untitled folder");
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const [searchParams] = useSearchParams();

  let clientId = params.clientId || searchParams.get("clientId") || "";

  const { mutate, isLoading } = useMutation(createFolder, {
    onSuccess: () => {
      snack.success("Folder Created");
      setOpen(false);
      setName("Untitled folder");
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    if (!name) {
      inputRef.current?.focus();
      return;
    }

    mutate({
      name,
      clientId,
      type,
      parent: searchParams.get("folderId"),
    });
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth PaperProps={{ sx: { p: 2 } }}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        New Folder
      </Typography>
      <TextField
        inputRef={inputRef}
        onChange={(e) => setName(e.target.value)}
        size="small"
        value={name}
        autoFocus
      />
      <Box mt={4} display="flex" gap={2} justifyContent="flex-end">
        <Button onClick={() => setOpen(false)} variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
        >
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default CreateFolderDialog;
