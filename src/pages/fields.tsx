import { Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { saveFormFields } from "api/forms";
import BreadCrumbs from "components/BreadCrumbs";
import { loading } from "components/FullPageLoader";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouteMatch } from "react-router";
import FieldsContainer from "views/forms/FieldsContainer";

function Fields() {
  const [addedFields, setAddedFields] = useState<any[]>([]);
  const snack = useSnack();
  const match: any = useRouteMatch();

  const { mutate } = useMutation(saveFormFields, {
    onSuccess: () => {
      snack.success("Form fields saved");
      loading(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      loading(false);
    },
  });

  const addField = (v: any) => {
    let existingField = addedFields.find((item) => item.field.id == v.id);
    if (existingField) {
      snack.error("Already added.");
      return;
    }
    setAddedFields([...addedFields, { field: v, isRequired: false }]);
  };

  const deleteField = (index: number) => {
    let filtered = [...addedFields].filter((_, i) => i !== index);
    setAddedFields(filtered);
  };

  const handleSubmit = () => {
    loading(true);
    mutate({ formFields: addedFields, id: match.params.formId });
  };

  useTitle("Forms");

  return (
    <>
      <BreadCrumbs page='fields' />
      <Box>
        <Grid container>
          <Grid item xs={7}>
            <Box p={2} maxWidth={600}>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'>
                <Typography variant='subtitle1' color='primary'>
                  GST - Fields
                </Typography>
                {addedFields.length > 0 && (
                  <Button
                    onClick={handleSubmit}
                    variant='outlined'
                    color='secondary'>
                    Save
                  </Button>
                )}
              </Box>
              <Box mt={2}>
                {addedFields.map((item, index) => (
                  <Box
                    mt={1}
                    borderRadius={2}
                    p={2}
                    border='1px solid rgba(0,0,0,0.1)'>
                    <Box display='flex' gap={1}>
                      <Box display='flex' flex={1} gap={1}>
                        <Typography variant='body1' color='GrayText'>
                          {index + 1}.
                        </Typography>
                        <Typography variant='body1' color='InactiveCaptionText'>
                          {item?.field?.name}.
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => deleteField(index)}
                        size='small'
                        color='secondary'
                        sx={{ alignSelf: "flex-start" }}>
                        <Delete />
                      </IconButton>
                    </Box>
                    <Box>
                      <FormControlLabel
                        control={<Checkbox size='small' color='secondary' />}
                        label='Is required'
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <FieldsContainer addField={addField} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Fields;
