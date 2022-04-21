import { Box } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormNestedInputs from "components/FormFields/FormNestedInputs";
import FormOptions from "components/FormFields/FormOptions";
import FormRadio from "components/FormFields/FormRadio";

const Name = (props: any) => {
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
        <FormNestedInputs
          name="inputs"
          label="Name Components"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormOptions
          name="titleOptions"
          control={control}
          label="Title options"
        />
      </Box>
    </>
  );
};

export default Name;
