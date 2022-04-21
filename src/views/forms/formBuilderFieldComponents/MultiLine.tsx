import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";

interface Props {
  item: any;
  control: any;
}

const MultiLine = (props: Props) => {
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
        <FormLimitRange
          name="range"
          includeFormat
          formats="multiline"
          control={control}
          label="Character Limit"
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
      <Box mt={2}>
        <FormCheckbox
          control={control}
          name="showCharacterCount"
          label="Show Character Count"
        />
      </Box>
    </>
  );
};

export default MultiLine;
