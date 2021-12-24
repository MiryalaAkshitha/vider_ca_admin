import { Box, Typography } from "@mui/material";
import { importClients } from "api/services/client";
import DrawerWrapper from "components/DrawerWrapper";
import FileDrop from "components/FileDrop";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { FILETYPES } from "utils/constants";

function ImportClients({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [files, setFiles] = useState<File[]>([]);

  const { mutate, isLoading } = useMutation(importClients, {
    onSuccess: () => {
      snack.success("Clients Import Successfully");
      setOpen(false);
      setFiles([]);
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
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption" color="rgba(0,0,0,0.7)">
          *Only .xls or .xlsx files are accepted
        </Typography>
        <a
          style={{ textDecoration: "none" }}
          href="https://jss-vider.s3.ap-south-1.amazonaws.com/bc478cc4-3e67-4414-830e-d57e0385ca38-sample_clients.xlsx"
        >
          <Typography variant="caption" color="secondary">
            Download Sample File
          </Typography>
        </a>
      </Box>
      <LoadingButton
        onClick={handleSubmit}
        variant="contained"
        loading={isLoading}
        sx={{ mt: 3 }}
        fullWidth
        color="secondary"
        title="Import Clients"
      />
    </DrawerWrapper>
  );
}

export default ImportClients;
