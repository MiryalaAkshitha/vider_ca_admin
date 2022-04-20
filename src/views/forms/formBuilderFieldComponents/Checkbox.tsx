import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormOptions from "components/FormFields/FormOptions";

interface Props {
  item: any;
  control: any;
  watch: any;
}

const Checkbox = (props: Props) => {
  const { control } = props;

  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormOptions name="options" control={control} label="Options" />
      </Box>
      <Box mt={2}>
        <FormLimitRange name="range" control={control} label="Choice Limit" />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default Checkbox;
