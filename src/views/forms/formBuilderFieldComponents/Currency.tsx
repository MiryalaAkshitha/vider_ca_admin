import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";

const Currency = (props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="fieldInstructions"
          label="Field Instructions"
          multiline
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
          name="currency"
          label="Select Currency"
          options={[
            { label: "Currency 1", value: "Currency 1" },
            { label: "Currency 2", value: "Currency 2" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="thousandSeparator"
          label="Thousand Separator"
          options={[
            { label: "Thousand Separator 1", value: "Thousand Separator 1" },
            { label: "Thousand Separator 2", value: "Thousand Separator 2" },
          ]}
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

export default Currency;
