import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { updateEvent } from "api/services/events";
import DrawerWrapper from "components/DrawerWrapper";
import FormTime from "components/FormFields/FomTime";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import { useTaskData } from "context/TaskDataContext";
import useSnack from "hooks/useSnack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { getTitle } from "utils";
import { Reminders } from "utils/constants";
import { linkEventDefaultValues, LinkEventSchema } from "validations/addEvent";

interface Props extends DialogProps {
  event: any;
}

function EditEvent({ open, setOpen, event }: Props) {
  const taskData: any = useTaskData();
  const queryClient = useQueryClient();
  const snack = useSnack();

  const { mutate, isLoading: createLoading } = useMutation(updateEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      setOpen(false);
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: linkEventDefaultValues,
    mode: "onChange",
    resolver: yupResolver(
      LinkEventSchema({ taskCreatedDate: taskData?.createdAt })
    ),
  });

  useEffect(() => {
    reset({
      ...event,
      members: event.members.map((user: any) => ({
        value: user.id,
        label: user.fullName,
      })),
      reminderCheck: Boolean(event.reminder),
      notes: event.notes || "",
    });
  }, [event, reset]);

  const onSubmit = (data: any) => {
    const { reminderCheck, ...apiData } = data;
    apiData.members = data.members.map((user: any) => user.value);
    mutate({
      id: event.id,
      data: {
        ...apiData,
        task: taskData?.id,
        client: taskData?.client?.id,
      },
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Update event">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormAutoComplete
          control={control}
          label="Members"
          multiple
          name="members"
          options={taskData?.members?.map((item: any) => ({
            label: item.fullName,
            value: item.id,
          }))}
        />
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
    </DrawerWrapper>
  );
}

export default EditEvent;
