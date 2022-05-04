import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormOptions from "components/FormFields/FormOptions";
import FormRadio from "components/FormFields/FormRadio";

interface Props {
  item: any;
  control: any;
  watch: any;
}

const DropDown = (props: Props) => {
  const { control } = props;

  return (
    <>
      <Box mt={2}>
        <FormInput name="label" label="Field Name" control={control} />
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
        <FormOptions name="options" control={control} label="Options" />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default DropDown;
