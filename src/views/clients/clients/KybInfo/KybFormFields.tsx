import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Paper } from "@mui/material";
import { updatePage } from "api/services/forms";
import useSnack from "hooks/useSnack";
import _ from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { generateDefaultValues } from "views/forms/utils/generateDefaultValues";
import { dynamicSchema } from "views/forms/utils/generateSchema";
import RenderField from "views/forms/utils/RenderField";
import { FormBuilderFieldTypes } from "views/forms/utils/renderFieldsComponent";
import { GreyButton } from "views/taskboard/styles";

function KybFormFields({ data, pageId, onContinue }: any) {
  const params = useParams();
  const snack = useSnack();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: generateDefaultValues(data),
    resolver: yupResolver(dynamicSchema(data)),
  });

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Values saved");
      onContinue();
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = (result: any) => {
    let newData = [...data];
    for (let key in result) {
      const value = result[key];
      const field = newData?.find((field: any) => field._id === key);
      const type = field?.fieldType;

      if (!field) continue;

      let hasInputs =
        type === FormBuilderFieldTypes.NAME ||
        type === FormBuilderFieldTypes.ADDRESS;

      if (!hasInputs) {
        field.value = value || null;
        continue;
      }

      Object.keys(value).forEach((inputKey) => {
        let input = field.inputs?.find((input: any) => input._id === inputKey);

        if (!input) return;

        input.value = value[inputKey] || null;
      });
    }

    updatePageFields({
      formId: params.formId,
      pageId: pageId,
      data: {
        fields: newData,
      },
    });
  };

  const handleCancel = () => {
    reset(generateDefaultValues(data));
  };

  useEffect(() => {
    const { errors } = formState;
    if (_.isEmpty(errors)) return;
    let firstError = Object.keys(errors)[0];
    document.getElementById(firstError)?.scrollIntoView();
  }, [formState]);

  return (
    <>
      <Box mt={4}>
        {data?.map((item: any) => (
          <Box key={item?._id} mb={4} id={item?._id}>
            <RenderField item={item} control={control} />
          </Box>
        ))}
      </Box>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: "100",
          transition: "0.8s",
        }}
      >
        <Box p={2} display="flex" gap={2}>
          <Button
            onClick={handleSubmit(onSubmit)}
            size="large"
            color="secondary"
            variant="contained"
          >
            Update Changes
          </Button>
          <GreyButton
            onClick={handleCancel}
            size="large"
            color="secondary"
            variant="contained"
          >
            Cancel
          </GreyButton>
        </Box>
      </Paper>
    </>
  );
}

export default KybFormFields;
