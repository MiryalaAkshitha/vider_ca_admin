import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";

interface Props {
  item: any;
  control: any;
}

const SingleLine = (props: Props) => {
  const { control } = props;
  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="instructions"
          label="Field Instructions"
          multiline
          control={control}
        />
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
        <FormSelect
          control={control}
          name="validationFormat"
          label="Validation Type"
          options={[
            { label: "Pan Number", value: "[A-Z]{5}[0-9]{4}[A-Z]{1}" },
            { label: "Aadhar Number", value: "^d{4}sd{4}sd{4}$" },
          ]}
        />
        <Box mt={2}>
          <FormLimitRange
            name="range"
            control={control}
            label="Character Limit"
          />
        </Box>
        <Box mt={2}>
          <FormCheckbox control={control} name="required" label="Mandatory" />
        </Box>
      </Box>
    </>
  );
};

export default SingleLine;
