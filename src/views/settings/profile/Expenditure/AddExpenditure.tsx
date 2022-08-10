import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/clients/clients";
import { addExpenditure } from "api/services/expenditure";
import { getTasks } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormInput from "components/FormFields/FormInput";
import FormNumber from "components/FormFields/FormNumber.";
import FormRadio from "components/FormFields/FormRadio";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import UploadImage from "components/UploadImage";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { handleError } from "utils/handleError";
import {
  addUserExpenditureDefaultValues,
  AddUserExpenditureSchema,
} from "validations/addUserExpenditure";

function AddExpenditure({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: addUserExpenditureDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddUserExpenditureSchema),
  });

  const { data, isLoading }: ResType = useQuery(["clients"], getClients, {
    enabled: open,
  });

  const { data: tasks }: ResType = useQuery(
    ["tasks", { client: +watch<any>("client")?.value }],
    getTasks,
    {
      enabled: open && watch("type") === "TASK" && Boolean(watch("client")),
    }
  );

  const { mutate } = useMutation(addExpenditure, {
    onSuccess: () => {
      snack.success("Expenditure Added");
      setOpen(false);
      queryClient.invalidateQueries("user_expenditure");
      reset(addUserExpenditureDefaultValues);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onSubmit = async (data: any) => {
    const { hours, minutes, client, task, ...apiData } = data;
    apiData.client = +client?.value;
    apiData.task = task?.id;
    apiData.amount = +apiData.amount;
    apiData.includeInInvoice = true;

    mutate({
      ...apiData,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Expenditure" setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRadio
          row
          name="type"
          control={control}
          options={[
            {
              label: "General",
              value: "GENERAL",
            },
            {
              label: "Task",
              value: "TASK",
            },
          ]}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Box mt={2}>
              <FormAutoComplete
                control={control}
                label="Client"
                name="client"
                options={
                  data?.data?.result?.map((item: any) => ({
                    label: item.displayName,
                    value: item.id,
                  })) || []
                }
              />
            </Box>
            {watch("type") === "TASK" && (
              <Box mt={2}>
                <SelectTask control={control} tasks={tasks?.data} />
              </Box>
            )}
            <Box mt={2}>
              <FormInput
                label="Particular name"
                control={control}
                name="particularName"
              />
            </Box>
            <Box mt={2}>
              <FormNumber label="Amount" control={control} name="amount" />
            </Box>
            {watch("type") === "TASK" && (
              <Box mt={2}>
                <FormRadio
                  label="Task Expense Type"
                  row
                  name="taskExpenseType"
                  control={control}
                  options={[
                    {
                      label: "Pure Agent",
                      value: "PURE_AGENT",
                    },
                    {
                      label: "Additional",
                      value: "ADDITIONAL",
                    },
                  ]}
                />
              </Box>
            )}
            <Box mt={2}>
              <Controller
                control={control}
                name="attachment"
                render={({ field }) => (
                  <UploadImage
                    name="image"
                    label="Click here to upload an attachment"
                    onChange={(v) => field.onChange(v)}
                  />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
              <LoadingButton
                loading={false}
                fullWidth
                loadingColor="white"
                title="Submit"
                color="secondary"
                type="submit"
              />
            </Box>
          </>
        )}
      </form>
    </DrawerWrapper>
  );
}

const SelectTask = ({ control, tasks }) => {
  return (
    <Controller
      control={control}
      name="task"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Autocomplete
          options={tasks || []}
          autoHighlight
          onChange={(e, v) => onChange(v)}
          value={value}
          getOptionLabel={(option: any) => option.name}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontSize: 11, color: "rgba(0,0,0,0.6)" }}
                >
                  {option?.taskNumber} - {option?.category?.name} -{" "}
                  {option?.client?.displayName}
                </Typography>
                <Typography variant="body2">{option.name}</Typography>
              </Box>
            </Box>
          )}
          renderInput={(params) => (
            <>
              <TextField
                {...params}
                label="Select Task"
                variant="outlined"
                fullWidth
                error={Boolean(error)}
                size="small"
              />
              {error && (
                <Typography
                  variant="caption"
                  sx={{ pl: "2px" }}
                  color="rgb(211, 47, 47)"
                >
                  {error.message || (error as any)?.value?.message}
                </Typography>
              )}
            </>
          )}
        />
      )}
    />
  );
};

export default AddExpenditure;
