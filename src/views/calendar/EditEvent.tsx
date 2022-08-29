import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { updateEvent } from "api/services/events";
import { getTasks } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormTime from "components/FormFields/FomTime";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { Reminders } from "data/constants";
import {
  addCalendarEventDefaultValues,
  AddCalendarEventSchema,
} from "validations/addCalendarEvent";
import ReactQuill from "lib/react-quill";

function EditEvent({ data, open, setOpen }) {
  const queryClient = useQueryClient();

  const { control, watch, handleSubmit, reset, setValue } = useForm({
    defaultValues: addCalendarEventDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddCalendarEventSchema()),
  });

  useEffect(() => {
    reset({
      ...data,
      client: data?.client
        ? {
            label: data?.client?.displayName,
            value: data?.client?.id,
          }
        : null,
      task: data?.task
        ? {
            label: data?.task?.name,
            value: data?.task?.id,
          }
        : null,
      members:
        data?.members?.map((member: any) => ({
          label: member.fullName,
          value: member.id,
        })) || [],
      reminderCheck: Boolean(data.reminder),
      reminder: data.reminder || "",
    });
  }, [data, reset]);

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(["clients"], getClients, {
    enabled: open && watch("type") === "TASK",
  });

  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["tasks", { client: watch<any>("client")?.value }],
    getTasks,
    {
      enabled: open && watch("type") === "TASK" && Boolean(watch("client")),
    }
  );

  let { mutate, isLoading: createLoading } = useMutation(updateEvent, {
    onSuccess: () => {
      snack.success("Event updated");
      queryClient.invalidateQueries("events");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = (result: any) => {
    const { reminderCheck, ...apiData } = result;
    apiData.client = apiData?.client?.value;
    apiData.task = apiData?.task?.value;
    apiData.members = apiData?.members?.map((user: any) => user.value);
    apiData.reminder = reminderCheck ? apiData.reminder : null;
    apiData.date = moment(apiData.date).format("YYYY-MM-DD");

    mutate({
      id: data?.id,
      data: { ...apiData },
    });
  };

  let taskMembers =
    tasks?.data?.find((item: any) => item?.id === watch<any>("task")?.value)?.members || [];

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update an Event">
      {clientsLoading || tasksLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {watch("type") === "TASK" && (
            <>
              <FormAutoComplete
                control={control}
                trigger={() => setValue("task", null)}
                label="Client"
                name="client"
                options={clients?.data?.result?.map((item: any) => ({
                  label: item.displayName,
                  value: item.id,
                }))}
              />
              {watch("client") && (
                <Box mt={2}>
                  <FormAutoComplete
                    control={control}
                    label="Task"
                    name="task"
                    options={tasks?.data?.map((item: any) => ({
                      label: item.name,
                      value: item.id,
                    }))}
                  />
                </Box>
              )}
              <Box mt={2}>
                {watch("task") && (
                  <FormAutoComplete
                    control={control}
                    label="Members"
                    multiple
                    name="members"
                    options={taskMembers?.map((item: any) => ({
                      label: item.fullName,
                      value: item.id,
                    }))}
                  />
                )}
              </Box>
            </>
          )}
          <Box mt={2}>
            <FormInput name="title" control={control} label="Title" />
          </Box>
          <Box mt={2}>
            <FormInput name="location" control={control} label="Location" />
          </Box>
          <Box mt={2}>
            <FormDate name="date" control={control} label="Date" />
          </Box>
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormTime name="startTime" control={control} label="Start Time" />
              </Grid>
              <Grid item xs={6}>
                <FormTime name="endTime" control={control} label="End Time" />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <FormCheckbox name="reminderCheck" control={control} label="Set Reminder" />
          </Box>
          {watch("reminderCheck") && (
            <Box mt={2}>
              <FormSelect
                name="reminder"
                control={control}
                label="Reminder"
                options={Object.values(Reminders).map((item) => ({
                  label: getTitle(item),
                  value: item,
                }))}
              />
            </Box>
          )}

          <Box mt={2}>
            <Controller
              control={control}
              name="notes"
              render={({ field: { value, onChange } }) => (
                <ReactQuill
                  value={value || ""}
                  onChange={(v: any) => {
                    onChange(v);
                  }}
                  id="overview"
                />
              )}
            />
          </Box>

          <Box mt={3}>
            <LoadingButton
              loading={createLoading}
              type="submit"
              fullWidth
              loadingColor="white"
              title="Update Event"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default EditEvent;
