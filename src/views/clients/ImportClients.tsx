import { Button, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { createClient, importClients } from "api/services/client";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FileDrop from "components/FileDrop";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, FILETYPES, ResType, SubmitType } from "types";
import { CLIENT_CATEGORIES } from "utils/constants";

function ImportClients({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [files, setFiles] = useState<File[]>([]);

  const { mutate, isLoading } = useMutation(importClients, {
    onSuccess: () => {
      snack.success("Clients Import Successfully");
      setOpen(false);
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleFiles = (files: File[]) => {
    setFiles(files);
  };

  const handleSubmit = () => {
    if (!files.length) {
      snack.error("Select a file");
      return;
    }

    const ValidFile = (): boolean => {
      return (
        files[0].type === FILETYPES.SHEET1 ||
        files[0].type === FILETYPES.SHEET2 ||
        files[0].type === FILETYPES.SHEET3
      );
    };

    if (!ValidFile()) {
      snack.error("Invalid File Type, Only .xls or .xlsx files are accepted");
      return;
    }

    let formData = new FormData();

    formData.append("file", files[0]);

    mutate(formData);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Import Clients">
      <FileDrop onChange={handleFiles} />
      <Typography variant="caption" color="rgba(0,0,0,0.7)">
        *Only .xls or .xlsx files are accepted
      </Typography>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3 }}
        fullWidth
        color="secondary"
      >
        Import
      </Button>
    </DrawerWrapper>
  );
}

export default ImportClients;
