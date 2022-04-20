import { Box } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";

interface Props {
  control: any;
  item: any;
}

const Number = (props: Props) => {
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
          includeFormat
          name="range"
          control={control}
          label="Value Limit"
        />
      </Box>
    </>
  );
};

export default Number;
