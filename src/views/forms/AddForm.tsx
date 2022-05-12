import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { createForm } from "api/services/forms";
import DrawerWrapper from "components/DrawerWrapper";
import FormFreeSoloAutoComplete from "components/FormFields/FormFreeSoloAutoComplete";
import FormInput from "components/FormFields/FormInput";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import {
  createFormDefaultValues,
  CreateFormSchema,
} from "validations/createForm";

function AddForm({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createForm, {
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries("forms");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: createFormDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateFormSchema()),
  });

  const onFormSubmit = (data: any) => {
    mutate({
      ...data,
      type: "TEMPLATE",
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Add New Form">
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
          title="Create Form"
          color="secondary"
        />
      </form>
    </DrawerWrapper>
  );
}

export default AddForm;
