import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { updateForm } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import FormFreeSoloAutoComplete from "components/FormFields/FormFreeSoloAutoComplete";
import FormInput from "components/FormFields/FormInput";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import {
  createFormDefaultValues,
  CreateFormSchema,
} from "validations/createForm";

interface Props extends DialogProps {
  data: any;
}

function EditForm({ open, setOpen, data }: Props) {
  const snack = useSnack();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: createFormDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateFormSchema()),
  });

  useEffect(() => {
    reset({
      name: data.name || "",
      tags: data.tags || [],
      description: data.description || "",
    });
  }, [data, reset]);

  const { mutate } = useMutation(updateForm, {
    onSuccess: () => {
      setOpen(false);
      snack.success("Form updated");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onFormSubmit = (result: any) => {
    mutate({
      id: data._id,
      data: result,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit form">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box>
          <FormInput control={control} name="name" label="Form Name" />
        </Box>
        <Box mt={2}>
          <FormFreeSoloAutoComplete
            control={control}
            label="Tags"
            name="tags"
            options={["Tag1", "Tag2"]}
            multiple
            freeSolo
          />
        </Box>
        <Box mt={2}>
          <FormInput
            control={control}
            name="description"
            label="Form Description"
            multiline
          />
        </Box>
        <LoadingButton
          loading={false}
          fullWidth
          sx={{ mt: 3 }}
          type="submit"
          loadingColor="white"
          title="Update form"
          color="secondary"
        />
      </form>
    </DrawerWrapper>
  );
}

export default EditForm;
