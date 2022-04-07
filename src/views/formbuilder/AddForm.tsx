import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import { useForm } from "react-hook-form";
import {
  createFormDefaultValues,
  CreateFormSchema,
} from "validations/createForm";
import { FormType } from "utils/constants";
import FormFreeSoloAutoComplete from "components/FormFields/FormFreeSoloAutoComplete";

function AddForm() {
  const { queryParams, setQueryParams } = useQueryParams();

  const { control, handleSubmit } = useForm({
    defaultValues: createFormDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateFormSchema()),
  });

  const onFormSubmit = (data: any) => {
    console.log(data);
    delete queryParams.createForm;
    setQueryParams({ ...queryParams });
  };

  return (
    <DrawerWrapper
      open={queryParams.createForm === "true"}
      setOpen={() => {
        delete queryParams.createForm;
        setQueryParams({
          ...queryParams,
        });
      }}
      title="Add New Form"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormSelect
          control={control}
          label="Form Type"
          name="formType"
          options={Object.values(FormType).map((item) => ({
            label: item,
            value: item,
          }))}
        />
        <Box mt={2}>
          <FormInput control={control} name="formName" label="Form Name" />
        </Box>
        <Box mt={2}>
          <FormFreeSoloAutoComplete
            control={control}
            label="Tags"
            name="tags"
            options={[]}
            multiple
            freeSolo
          />
        </Box>
        <Box mt={2}>
          <FormInput
            control={control}
            name="formDescription"
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
