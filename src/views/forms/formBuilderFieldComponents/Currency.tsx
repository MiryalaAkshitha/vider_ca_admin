import { Box } from "@mui/material";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormLimitRange from "components/FormFields/FormLimitRange";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import { currencies } from "data/currencies";

interface Props {
  item: any;
  control: any;
  watch: any;
}

const Currency = (props: Props) => {
  const { control } = props;

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
        <FormSelect
          control={control}
          name="currencyType"
          label="Currency"
          options={currencies?.map((currency: any) => ({
            label: currency.name,
            value: currency.code,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="currencyDisplay"
          label="Currency Display"
          options={[
            { label: "Code", value: "CODE" },
            { label: "Symbol", value: "SYMBOL" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormLimitRange name="range" control={control} label="Limit" />
      </Box>
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default Currency;
