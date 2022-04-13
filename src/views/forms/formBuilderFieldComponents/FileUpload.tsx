import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";

const FileUpload = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="feildInstructions"
          label="Feild Instructions"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldSize"
          label="Field Size"
          options={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormInput
          name="placeHolderText"
          label="PlaceHolder Text"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldType"
          label="Field Type"
          options={[
            { label: "Mandatory", value: "mandatory" },
            { label: "Non Madatory", value: "non mandatory" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="uploadType"
          label="Select File Upload Type"
          options={[
            { label: "Upload Type 1", value: "Upload Type 1" },
            { label: "Upload Type 2", value: "Upload Type 2" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="uploadLimit"
          label="Maximum File Upload Limit"
          options={[
            { label: "Upload Limit 1", value: "Upload Limit 1" },
            { label: "Upload Limit 2", value: "Upload Limit 2" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="sizeType"
          label="File Size Limit"
          options={[
            { label: "File Size Limit 1", value: "File Size Limit 1" },
            { label: "File Size Limit 2", value: "File Size Limit 2" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormInput
          name="maxFileSize"
          label="Maximum File Size"
          control={control}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <LoadingButton
          loading={false}
          fullWidth
          type="submit"
          loadingColor="white"
          title="Create Field"
          color="secondary"
        />
      </Box>
    </>
  );
};

export default FileUpload;
