import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { createEvent } from "api/services/events";
import DrawerWrapper from "components/DrawerWrapper";
import FormTime from "components/FormFields/FomTime";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { getTitle } from "utils";
import { Reminders } from "data/constants";
import { linkEventDefaultValues, LinkEventSchema } from "validations/addEvent";
import ReactQuill from "lib/react-quill";

function LinkEvent({ open, setOpen }: DialogProps) {
  const taskData: any = useTaskData();
  const queryClient = useQueryClient();

  const { mutate, isLoading: createLoading } = useMutation(createEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      setOpen(false);
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, watch, handleSubmit } = useForm({
    defaultValues: linkEventDefaultValues,
    mode: "onChange",
    resolver: yupResolver(
      LinkEventSchema({ taskCreatedDate: taskData?.createdAt })
    ),
  });

  const onSubmit = (data: any) => {
    const { reminderCheck, ...apiData } = data;
    apiData.members = data.members.map((user: any) => user.value);
    mutate({
      ...apiData,
      task: taskData?.id,
      client: taskData?.client?.id,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Link an event">
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
            title="Create Event"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default LinkEvent;
