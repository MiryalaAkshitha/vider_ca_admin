import { Box } from "@mui/material";
import FormDate from "components/FormFields/FormDate";

const NonRecurringFields = ({ control }) => {
  return (
    <>
      <Box mt={2}>
        <FormDate name="startDate" control={control} label="Start Date" />
      </Box>
      <Box mt={2}>
        <FormDate name="dueDate" control={control} label="Due Date" />
      </Box>
      <Box mt={2}>
        <FormDate
          name="expectedCompletionDate"
          control={control}
          label="Expected Completion Date"
        />
      </Box>
    </>
  );
};

export default NonRecurringFields;
