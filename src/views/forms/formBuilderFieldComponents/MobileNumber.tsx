import { Box, Typography } from "@mui/material";
import FormAutoCompleteCountries from "components/FormFields/FormAutoCompleteCountries";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import countries from "data/countries";

const MobileNumber = (props: any) => {
  const { control, watch } = props;

  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="placeHolder"
          label="PlaceHolder Text"
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
            { label: "Small", value: "SMALL" },
            { label: "Medium", value: "MEDIUM" },
            { label: "Large", value: "LARGE" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormLimitRange name="range" control={control} label="Limit" />
      </Box>
      <Box mt={2} sx={{ width: "40%" }}>
        <FormCheckbox
          control={control}
          label="Show Country Codes"
          name="includeCountryCode"
        />
      </Box>
      {watch("includeCountryCode") && (
        <>
          <Box mt={2}>
            <FormAutoCompleteCountries
              control={control}
              label="Select Countries"
              name="allowedCountries"
            />
            <Typography
              sx={{
                display: "block",
                color: "rgba(0,0,0,0.6)",
                mt: "3px",
                ml: "2px",
              }}
              variant="caption"
            >
              By default all countries all selected if you don't select any
            </Typography>
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              label="Default country"
              name="defaultCountryCode"
              options={countries.map((item) => ({
                label: item.label,
                value: item.phone,
              }))}
            />
          </Box>
          <Box mt={2}>
            <FormCheckbox control={control} name="required" label="Mandatory" />
          </Box>
        </>
      )}
    </>
  );
};

export default MobileNumber;
