import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { getClients } from "api/services/client";
import { createEvent } from "api/services/events";
import { getTasks } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormTime from "components/FormFields/FomTime";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { Reminders } from "utils/constants";
import {
  addCalendarEventDefaultValues,
  AddCalendarEventSchema,
} from "validations/addCalendarEvent";

function EditEvent({ data, open, setOpen }) {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const snack = useSnack();

  useEffect(() => {
    reset({
      title: data?.title ? data.title : " ",
      location: data?.location ? data?.location : " ",
      date: data?.date ? data?.date : " ",
      startTime: data?.startTime ? data?.startTime : " ",
      endTime: data?.endTime ? data?.endTime : " ",
      notes: data?.notes ? data.notes : " ",
    });
  }, []);

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients", {}],
    getClients,
    {
      enabled: queryParams.createEvent === "true",
    }
  );

  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["tasks", {}],
    getTasks,
    {
      enabled: queryParams.createEvent === "true",
    }
  );

  const { mutate, isLoading: createLoading } = useMutation(createEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      delete queryParams.createEvent;
      setQueryParams({ ...queryParams });
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: addCalendarEventDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddCalendarEventSchema()),
  });

  const onSubmit = (data: any) => {
    const { reminderCheck, ...apiData } = data;
    apiData.client = apiData?.client?.value;
    apiData.task = apiData?.task?.value;
    mutate({
      ...apiData,
    });
  };

  let clientTasks = tasks?.data
    ?.filter(
      (item: any) => item?.client?.id === parseInt(watch<any>("client")?.value)
    )
    ?.map((item: any) => ({
      label: item.name,
      value: item.id,
    }));

  let taskMembers =
    tasks?.data?.find((item: any) => item?.id === watch<any>("task")?.value)
      ?.members || [];

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update an Event">
      {clientsLoading || tasksLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormAutoComplete
            control={control}
            label="Client"
            name="client"
            options={clients?.data[0]?.map((item: any) => ({
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
                options={clientTasks}
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
                <FormTime
                  name="startTime"
                  control={control}
                  label="Start Time"
                />
              </Grid>
              <Grid item xs={6}>
                <FormTime name="endTime" control={control} label="End Time" />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <FormInput multiline name="notes" control={control} label="Notes" />
          </Box>
          <Box mt={2}>
            <FormCheckbox
              name="reminderCheck"
              control={control}
              label="Set Reminder"
            />
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
