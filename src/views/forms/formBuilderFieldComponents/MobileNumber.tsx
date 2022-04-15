import { Box, Typography } from "@mui/material";
import FormAutoCompleteCountries from "components/FormFields/FormAutoCompleteCountries";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import LoadingButton from "components/LoadingButton";

const MobileNumber = (props: any) => {
  const { control, watch } = props;
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
      <Box mt={2} sx={{ width: "40%" }}>
        <FormCheckbox
          control={control}
          label="Show Country Codes"
          name="showCountryCodes"
        />
      </Box>
      {watch("showCountryCodes") && (
        <Box mt={2}>
          <FormAutoCompleteCountries
            multiple
            control={control}
            label="Select Countries"
            name="selectCountries"
          />
        </Box>
      )}
      <Typography variant="body2" sx={{ mt: 2 }}>
        By default all countries are selected
      </Typography>
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

export default MobileNumber;
