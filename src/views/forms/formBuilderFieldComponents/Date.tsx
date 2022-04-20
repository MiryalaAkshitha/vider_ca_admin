import { Box } from "@mui/material";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";

interface Props {
  item: any;
  control: any;
  watch: any;
}

const Date = (props: Props) => {
  const { control, watch } = props;

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
        <FormAutoComplete
          multiple
          control={control}
          name="allowedDays"
          label="Allowed Days"
          options={[
            { label: "Sunday", value: "SUNDAY" },
            { label: "Monday", value: "MONDAY" },
            { label: "Tuesday", value: "TUESDAY" },
            { label: "Wednesday", value: "WEDNESSDAY" },
            { label: "Thursday", value: "THURSDAY" },
            { label: "Friday", value: "FRIDAY" },
            { label: "Saturday", value: "SATURDAY" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="allowedDates"
          label="Allowed Dates"
          options={[
            { label: "All", value: "ALL" },
            { label: "Past Dates", value: "PAST" },
            { label: "Future Dates", value: "FUTURE" },
            { label: "Custom", value: "CUSTOM" },
          ]}
        />
      </Box>
      {watch("allowedDates") === "CUSTOM" && (
        <Box mt={2} sx={{ display: "flex", gap: 1 }}>
          <Box>
            <FormDate name="startDate" control={control} label="From Date" />
          </Box>
          <Box>
            <FormDate name="endDate" control={control} label="End Date" />
          </Box>
        </Box>
      )}
      <Box mt={2}>
        <FormCheckbox control={control} name="required" label="Mandatory" />
      </Box>
    </>
  );
};

export default Date;
