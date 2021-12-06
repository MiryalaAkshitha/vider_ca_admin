import { Remove } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteClientInfo } from "api/client-info";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import renderField from "../ClientInfo/renderField";

function KybDetails({ state, forms, setState }: any) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const params: any = useParams();
  const confirm = useConfirm();

  const onChange = (field, e) => {
    let type = field?.fieldType;
    let newFields = [...state];
    let index = newFields.findIndex((item) => item.id === field?.id);
    if (type === "checkbox") {
      newFields[index].value = e.target.checked.toString();
    } else {
      newFields[index].value = e.target.value;
    }
    setState(newFields);
  };

  const { mutate } = useMutation(deleteClientInfo, {
    onSuccess: () => {
      snack.success("Fields Deleted");
      queryClient.invalidateQueries("client-info");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = (form) => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        mutate({ form, clientId: params.clientId });
      },
    });
  };

  return (
    <Box>
      {forms.map((form, formIndex) => (
        <Box key={formIndex} mb={8}>
          <Box display="flex" mb={2} gap={1} alignItems="center">
            <Typography variant="subtitle2" color="primary">
              {form}
            </Typography>
            <IconButton onClick={() => handleDelete(form)} size="small">
              <Remove color="secondary" fontSize="small" />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            {state
              .filter((item) => item?.form === form)
              .map((field, index) => (
                <Grid item xs={6} key={index}>
                  {renderField(field, (e) => onChange(field, e))}
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default KybDetails;
