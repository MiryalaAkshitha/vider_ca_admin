import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { http } from "api/http";
import { getClients } from "api/services/clients/clients";
import { createEvent } from "api/services/events";
import { getTasks } from "api/services/tasks/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormTime from "components/FormFields/FomTime";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormDate from "components/FormFields/FormDate";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { getTitle } from "utils";
import { Reminders } from "data/constants";
import {
  addCalendarEventDefaultValues,
  AddCalendarEventSchema,
} from "validations/addCalendarEvent";
import ReactQuill from "lib/react-quill";

interface Props extends DialogProps {
  successCb?: () => void;
}

function AddEvent({ open, setOpen }: Props) {
  const queryClient = useQueryClient();

  const { control, watch, handleSubmit, reset } = useForm({
    defaultValues: addCalendarEventDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddCalendarEventSchema()),
  });

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

  const { mutate, isLoading: createLoading } = useMutation(createEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      setOpen(false);
      reset(addCalendarEventDefaultValues);
      queryClient.invalidateQueries("events");      
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = (data: any) => {
    const { reminderCheck, ...apiData } = data;
    apiData.client = apiData?.client?.value;
    apiData.task = apiData?.task?.value;
    apiData.members = data.members.map((user: any) => user.value);
    apiData.reminder = data.reminderCheck ? data.reminder : null;
    mutate({
      ...apiData,
    });
    if(data.type == "NEWSLETTER") {
      sendEmail(data);
    }    
  };

  let taskMembers =
    tasks?.data?.find((item: any) => item?.id === watch<any>("task")?.value)?.members || [];

  const sendEmail = (state) => {
    console.log(state);
    const obj = {
      templateid: state.title,
      fromAddress: state.fromAddress,
      toAddress: state.toAddress,
      schedule: formatDate(state.date),
      status: "Active"
    }    
    http
      .post("/common/sendscheduler", obj)
      .then((res) => {
        console.log(res);
        alert("Event created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDate = (currDate) => {
    const today = currDate ? currDate : new Date();
    const year = today.getFullYear();
    const mon = today.getMonth()+1;
    const day = today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
    return ""+year+"-"+mon+"-"+day;
  }

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create an Event">
      {clientsLoading || tasksLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRadio
            control={control}
            name="type"
            row
            label="Event Type"
            options={[
              { label: "Event", value: "EVENT" },
              { label: "Task", value: "TASK" },
              { label: "Newsletter", value: "NEWSLETTER" },
            ]}
          />
          {watch("type") === "TASK" && (
            <>
              <Box mt={2}>
                <FormAutoComplete
                  control={control}
                  label="Client"
                  name="client"
                  options={clients?.data?.result?.map((item: any) => ({
                    label: item.displayName,
                    value: item.id,
                  }))}
                />
              </Box>
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
            <FormInput name="title" control={control} label={watch('type') !== 'NEWSLETTER' ? 'Title' : 'TemplateId'} />
          </Box>
          <Box mt={2}>
          {watch("type") === "NEWSLETTER" && (
            <FormInput name="fromAddress" control={control} label="fromAddress" />
          )}
          </Box>
          <Box mt={2}>
          {watch("type") === "NEWSLETTER" && (
            <FormInput name="toAddress" control={control} label="toAddress" />
          )}
          </Box>
          <Box mt={2}>
          {watch("type") !== "NEWSLETTER" && (
            <FormInput name="location" control={control} label="Location" />
          )}
          </Box>
          <Box mt={2}>
            <FormDate name="date" control={control} label="Date" />
          </Box>
          <Box mt={2}>
          {watch("type") !== "NEWSLETTER" && 
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormTime name="startTime" control={control} label="Start Time" />
              </Grid>
              <Grid item xs={6}>
                <FormTime name="endTime" control={control} label="End Time" />
              </Grid>
            </Grid>
          }
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
              title="Create Event"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddEvent;
