import { Box, Typography } from "@mui/material";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormNumber from "components/FormFields/FormNumber.";
import FormSelect from "components/FormFields/FormSelect";
import { FormBuilderFileTypes } from "../utils/renderFieldsComponent";

const FileUpload = (props: any) => {
  const { control } = props;

  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormAutoComplete
          control={control}
          name="uploadFileTypes"
          multiple
          options={Object.keys(FormBuilderFileTypes).map((key: any) => ({
            label: key,
            value: FormBuilderFileTypes[key],
          }))}
          label="Upload File Types"
        />
      </Box>
      <Box mt={2}>
        <FormLimitRange name="range" control={control} label="Files limit" />
      </Box>
      <Box mt={2}>
        <Typography mb="10px" variant="body2" color="rgba(0,0,0,0.6)">
          File max size
        </Typography>
        <Box display="flex" gap={1}>
          <Box flex={1}>
            <FormNumber label="Size" name="fileMaxSize" control={control} />
          </Box>
          <Box flex={1}>
            <FormSelect
              label="Size"
              name="fileMaxSizeType"
              control={control}
              options={[
                { label: "KB", value: "KB" },
                { label: "MB", value: "MB" },
              ]}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default FileUpload;
