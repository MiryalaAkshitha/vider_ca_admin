import { Box } from "@mui/material";
import FormDate from "components/FormFields/FormDate";
import FormSelect from "components/FormFields/FormSelect";
import { getFinancialYears } from "utils/getFinancialYears";

const NonRecurringFields = ({ control }) => {
  return (
    <>
      <Box mt={2}>
        <FormDate
          name="startDate"
          required
          control={control}
          label="Start Date"
        />
      </Box>
      <Box mt={2}>
        <FormDate name="dueDate" required control={control} label="Due Date" />
      </Box>
      <Box mt={2}>
        <FormDate
          name="expectedCompletionDate"
          control={control}
          label="Expected Completion Date"
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="financialYear"
          label="Finanacial Year"
          required
          options={getFinancialYears().map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Box>
    </>
  );
};

export default NonRecurringFields;
