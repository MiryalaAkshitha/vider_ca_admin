import { Box, Typography } from "@mui/material";
import { importClients } from "api/services/clients/clients";
import DrawerWrapper from "components/DrawerWrapper";
import FileDrop from "components/FileDrop";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { FILETYPES } from "data/constants";

interface Props extends DialogProps {
  successCb?: () => void;
}

function ImportClients({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isLoading } = useMutation(importClients, {
    onSuccess: () => {
      setOpen(false);
      setFile(null);
      snack.success("Clients imported successfully");
      successCb && successCb();
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleFiles = (files: File[]) => {
    setFile(files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      snack.error("Select a file");
      return;
    }

    const ValidFile = (): boolean => {
      return (
        file.type === FILETYPES.SHEET1 ||
        file.type === FILETYPES.SHEET2 ||
        file.type === FILETYPES.SHEET3
      );
    };

    if (!ValidFile()) {
      snack.error("Invalid File Type, Only .xls or .xlsx files are accepted");
      return;
    }

    let formData = new FormData();
    formData.append("file", file);
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
          href="https://jss-vider.s3.ap-south-1.amazonaws.com/sample-import.xlsx"
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
