import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";

const Number = (props) => {
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
          name="entryType"
          label="Entry Type"
          options={[
            { label: "Entry Type 1", value: "Entry Type 1" },
            { label: "Entry Type 2", value: "Entry Type 2" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="caption">Character Limit</Typography>
      </Box>
      <Box mt={2} sx={{ display: "flex" }}>
        <Box mr={1}>
          <FormInput name="min" label="Min" control={control} />
        </Box>
        <Box mr={1}>
          <FormInput name="max" label="Max" control={control} />
        </Box>
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          name="unitSelection"
          label="Unit Selection"
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
          control={control}
        />
      </Box>
      <Box mt={2} sx={{ display: "flex" }}>
        <FormInput control={control} name="unitTitle" label="Unit Title" />
        <FormSelect
          style={{ width: "35%" }}
          control={control}
          name="unitTitleAddOn"
          options={[
            { label: "Prefix", value: "prefix" },
            { label: "Suffix", value: "suffix" },
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

export default Number;
