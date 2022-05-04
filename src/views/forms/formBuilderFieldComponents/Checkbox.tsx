import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormOptions from "components/FormFields/FormOptions";
import FormSelect from "components/FormFields/FormSelect";

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
      <Box mt={4}>
        <FormSelect
          name="displayColumns"
          control={control}
          label="Display Columns"
          options={[
            { label: "1 Column", value: "1_COLUMN" },
            { label: "2 Columns", value: "2_COLUMNS" },
            { label: "3 Columns", value: "3_COLUMNS" },
            { label: "Side By Side", value: "SIDE_BY_SIDE" },
          ]}
        />
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
