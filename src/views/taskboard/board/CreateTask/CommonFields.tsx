import { Box } from "@mui/material";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormInput from "components/FormFields/FormInput";
import FormNumber from "components/FormFields/FormNumber.";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import { getFinancialYears, getTitle } from "utils";
import { PriorityEnum } from "utils/constants";

function CommonFields({ control, watch, users, labels, setValue }) {
  return (
    <>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="financialYear"
          label="Finanacial Year"
          options={getFinancialYears().map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormAutoComplete
          control={control}
          label="Labels"
          multiple
          name="labels"
          options={labels?.data.map((item: any) => ({
            label: item.name,
            value: item.id,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormAutoComplete
          control={control}
          label="Members"
          multiple
          name="members"
          options={users?.data.map((item: any) => ({
            label: item.fullName,
            value: item.id,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="taskLeader"
          label="Task Leader"
          options={users?.data.map((item: any) => ({
            label: item.fullName,
            value: item.id,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormSelect
          control={control}
          name="priority"
          label="Priority"
          options={Object.values(PriorityEnum).map((item, index) => ({
            label: getTitle(item),
            value: item,
          }))}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="feeType"
          onChange={(v) => {
            let feeAmount =
              v === "HOURLY"
                ? watch("service")?.hourlyPrice
                : watch("service")?.totalPrice;
            setValue("feeAmount", feeAmount || "");
          }}
          label="Fee Type"
          options={[
            {
              label: "Hourly",
              value: "HOURLY",
            },
            {
              label: "Total",
              value: "TOTAL",
            },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormNumber control={control} name="feeAmount" label="Fee Amount" />
      </Box>
      {watch("serviceType") === "custom" && (
        <Box mt={2}>
          <FormInput
            control={control}
            name="description"
            label="Description"
            multiline
          />
        </Box>
      )}
    </>
  );
}

export default CommonFields;
