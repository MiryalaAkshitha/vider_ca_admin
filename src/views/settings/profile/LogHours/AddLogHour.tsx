import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/clients/clients";
import { getTasks, getUserTasks } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import { getHoursOptions, getMinutesOptions } from "utils";
import {
  addUserLogHourDefaultValues,
  AddUserLogHourSchema,
} from "validations/addUserLogHour";

interface Props extends DialogProps {
  onAdd: (data: any) => Promise<any>;
}

function AddLogHour({ open, setOpen, onAdd }: Props) {
  const { control, trigger, handleSubmit, watch, reset } = useForm({
    defaultValues: addUserLogHourDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddUserLogHourSchema),
  });

  const { data, isLoading }: ResType = useQuery(["clients"], getClients, {
    enabled: open && watch("logHourType") === "GENERAL",
  });

  const { data: tasks }: ResType = useQuery(
    ["tasks", { client: +watch<any>("client")?.value, type: "SELF" }],
    getUserTasks,
    {
      enabled:
        open && watch("logHourType") === "TASK" && Boolean(watch("client")),
    }
  );

  const onSubmit = async (data: any) => {
    const { hours, minutes, client, task, ...apiData } = data;
    apiData.client = client?.value;
    apiData.task = task?.id;
    apiData.duration = moment
      .duration(`${data.hours?.value}:${data.minutes?.value}`)
      .asMilliseconds();

    await onAdd({ ...apiData });

    reset(addUserLogHourDefaultValues);
  };

  return (
    <DrawerWrapper open={open} title="Add Log Hour" setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRadio
          row
          name="logHourType"
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
            {watch("logHourType") === "GENERAL" && (
              <Box mt={1}>
                <FormInput label="Title" control={control} name="title" />
              </Box>
            )}
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
            {watch("logHourType") === "TASK" && (
              <Box mt={2}>
                <SelectTask control={control} tasks={tasks?.data} />
              </Box>
            )}
            <Box mt={2}>
              <FormDate control={control} label="Date" name="completedDate" />
            </Box>
            <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
              <FormAutoComplete
                control={control}
                label="Hours"
                name="hours"
                trigger={() => trigger("minutes")}
                options={getHoursOptions()}
              />
              <FormAutoComplete
                control={control}
                label="Minutes"
                name="minutes"
                options={getMinutesOptions()}
              />
            </Box>
            <Box mt={2}>
              <FormInput
                label="Description"
                control={control}
                name="description"
                multiline
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

export default AddLogHour;
