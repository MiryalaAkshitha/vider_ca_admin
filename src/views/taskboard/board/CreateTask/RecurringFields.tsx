import { Box } from "@mui/material";
import FormSelect from "components/FormFields/FormSelect";
import { getTitle } from "utils";
import { RecurringFrequency } from "utils/constants";
import CustomDates from "./CustomDates";
import FrequencyDates from "./FrequencyDates";

const RecurringFields = ({ control, watch }) => {
  const frequencyIsNotCustom = () => {
    return (
      watch("frequency") && watch("frequency") !== RecurringFrequency.CUSTOM
    );
  };

  return (
    <>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="frequency"
          label="Frequency"
          options={Object.values(RecurringFrequency).map((item) => ({
            label: getTitle(item),
            value: item,
          }))}
        />
      </Box>
      {frequencyIsNotCustom() && <FrequencyDates control={control} />}
      {watch("frequency") === RecurringFrequency.CUSTOM && (
        <CustomDates control={control} />
      )}
    </>
  );
};

export default RecurringFields;
