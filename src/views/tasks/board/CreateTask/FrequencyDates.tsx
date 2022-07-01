import { Box } from "@mui/system";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";

interface Props {
  control: any;
}

function FrequencyDates({ control }: Props) {
  return (
    <>
      <Box mt={2}>
        <FormDate
          name="recurringStartDate"
          control={control}
          label="Recurring Start Date"
        />
      </Box>
      <Box mt={2}>
        <FormAutoComplete
          control={control}
          label="Due Day"
          name="dueDay"
          options={Array.from(Array(31), (v, i) => i + 1).map((item: any) => ({
            label: item?.toString(),
            value: item,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormDate
          name="recurringEndDate"
          control={control}
          label="Recurring End Date"
        />
      </Box>
      <Box mt={2}>
        <FormCheckbox
          name="neverExpires"
          control={control}
          label="Never Expires"
        />
      </Box>
    </>
  );
}

export default FrequencyDates;
