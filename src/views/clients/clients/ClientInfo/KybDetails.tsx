import { Add, Remove } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteClientInfo } from "api/services/client-info";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { renderField } from "views/clients/clients/ClientInfo/renderField";
import AddCustomField from "./AddCustomField";

interface IKybDetailsProps {
  state: any[];
  forms: any[];
  setState: (state: any[]) => void;
}

function KybDetails({ state, forms, setState }: IKybDetailsProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const params = useParams();
  const confirm = useConfirm();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<any>(null);

  const onChange = (field: any, value: any) => {
    const newFields = [...state];
    const index = newFields.findIndex((item) => item.id === field?.id);
    newFields[index].value = value;
    setState(newFields);
  };

  const { mutate } = useMutation(deleteClientInfo, {
    onSuccess: () => {
      snack.success("Fields has been successfully deleted");
      queryClient.invalidateQueries("client-info");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = (form: string) => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        mutate({ form, clientId: params.clientId });
      },
    });
  };

  return (
    <>
      <Box mt={2}>
        {forms.map((form, formIndex) => (
          <Box key={formIndex} mb={8}>
            <Box
              display="flex"
              alignItems="center"
              mb={1}
              justifyContent="space-between"
            >
              <Box display="flex" gap={1} alignItems="center">
                <Typography variant="subtitle2" color="primary">
                  {form}
                </Typography>
                <IconButton onClick={() => handleDelete(form)} size="small">
                  <Remove color="secondary" fontSize="small" />
                </IconButton>
              </Box>
              <Button
                startIcon={<Add />}
                onClick={() => {
                  setSelectedForm(form);
                  setOpen(true);
                }}
                size="small"
                color="secondary"
              >
                Add custom field
              </Button>
            </Box>
            <Grid container spacing={2}>
              {state
                .filter((item) => item?.form === form)
                .map((field, index) => (
                  <Grid item xs={6} key={index}>
                    {renderField(field, (value: any) => onChange(field, value))}
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}
      </Box>
      <AddCustomField open={open} setOpen={setOpen} form={selectedForm} />
    </>
  );
}

export default KybDetails;
