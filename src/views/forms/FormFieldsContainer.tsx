import { Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getFormFields, saveFormFields } from "api/forms";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  removeField,
  selectForm,
  setFields,
  toggleRequired,
} from "redux/reducers/formsSlice";

export interface FormFieldResponse {
  data: any;
}

function FormFieldsContainer() {
  const dispatch = useDispatch();
  const params = useParams();
  const snack = useSnack();
  const { addedFields } = useSelector(selectForm);

  const { data, isLoading }: UseQueryResult<FormFieldResponse, Error> =
    useQuery(["form-fields", params.formId], getFormFields, {
      onSuccess: (res) => {
        dispatch(setFields(res.data.formFields));
      },
    });

  const { mutate, isLoading: saveLoading } = useMutation(saveFormFields, {
    onSuccess: () => {
      snack.success("Form fields saved");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    mutate({ formFields: addedFields, id: params.formId });
  };

  if (isLoading || saveLoading) return <Loader />;

  return (
    <Box py={2} maxWidth={600}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          {data?.data?.name} - Fields
        </Typography>
        {addedFields.length > 0 && (
          <Button onClick={handleSubmit} variant="outlined" color="secondary">
            Save
          </Button>
        )}
      </Box>
      <Box mt={2}>
        {addedFields.map((item, index) => (
          <Box mt={1} borderRadius={2} p={2} border="1px solid rgba(0,0,0,0.1)">
            <Box display="flex" gap={1}>
              <Box display="flex" flex={1} gap={1}>
                <Typography variant="body1" color="GrayText">
                  {index + 1}.
                </Typography>
                <Typography variant="body1" color="InactiveCaptionText">
                  {item?.field?.name}.
                </Typography>
              </Box>
              <IconButton
                onClick={() => dispatch(removeField(index))}
                size="small"
                color="secondary"
                sx={{ alignSelf: "flex-start" }}
              >
                <Delete />
              </IconButton>
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) =>
                      dispatch(
                        toggleRequired({ index, value: e.target.checked })
                      )
                    }
                    size="small"
                    checked={item.isRequired}
                    color="secondary"
                  />
                }
                label="Is required"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default FormFieldsContainer;
