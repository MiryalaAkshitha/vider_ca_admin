import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { addLogHour } from "api/services/tasks/loghours";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormDate from "components/FormFields/FormDate";
import FormTime from "components/FormFields/FomTime";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, ResType } from "types";
import { getHoursOptions, getMinutesOptions } from "utils";
import { addLogHourDefaultValues, AddLogHourSchema } from "validations/addLogHour";
import { handleError } from "utils/handleError";
import { useState } from "react";
import { Button } from "@mui/material";

function AddLogHour({ open, setOpen }: DialogProps) {
  const params: any = useParams();
  const queryClient = useQueryClient();
  const [enterInHours, setEnterInHours] = useState(false);

  const taskData: any = useTaskData();

  const { data, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate, isLoading: createLoading } = useMutation(addLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Added");
      setOpen(false);
      queryClient.invalidateQueries("loghours");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { control, trigger, handleSubmit } = useForm({
    defaultValues: addLogHourDefaultValues,
    mode: "onChange",
    resolver: yupResolver(AddLogHourSchema({ taskCreatedDate: taskData?.createdAt, enterInHours })),
    // resolver: yupResolver(AddLogHourSchema({ enterInHours, })),
  });

  const onSubmit = (data: any) => {
    const { hours, minutes, ...apiData } = data;
    apiData.users = data.users.map((user: any) => user.value);
    if (enterInHours) {
      apiData.duration = moment.duration(`${data.hours?.value}:${data.minutes?.value}`).asMilliseconds();
    } else {
      let startTime = moment.duration(moment(data.startTime).format("HH:mm")).asMilliseconds();
      let endTime = moment.duration(moment(data.endTime).format("HH:mm")).asMilliseconds();
      apiData.startTime = startTime;
      apiData.endTime = endTime;
      apiData.duration = endTime - startTime;
    }
    mutate({
      data: {
        ...apiData,
        taskId: +params.taskId,
      },
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Log Hour" setOpen={setOpen}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormAutoComplete
            control={control}
            label="Users"
            multiple
            name="users"
            options={data?.data?.map((item: any) => ({
              label: item.fullName,
              value: item.id,
            }))}
          />
          <Box mt={2}>
            <FormDate control={control} label="Date" name="completedDate" />
          </Box>
          {enterInHours ? (
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
          ) : (
            <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
              <FormTime name="startTime" control={control} label="Start Time" />
              <FormTime name="endTime" control={control} label="End Time" />
            </Box>
          )}
          <Box sx={{ textAlign: "right", mt: 1 }}>
            <Button variant="text" color="primary" onClick={() => setEnterInHours(!enterInHours)}>
              {enterInHours ? "Set Start Time And End Time" : "Enter in hours"}
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={createLoading}
              fullWidth
              loadingColor="white"
              title="Add Log Hour"
              color="secondary"
              type="submit"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddLogHour;
