import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { updateLogHour } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormDate from "components/FormFields/FormDate";
import LoadingButton from "components/LoadingButton";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import moment from "moment";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { getHoursOptions, getMinutesOptions } from "utils";
import {
  editLogHourDefaultValues,
  EditLogHourSchema,
} from "validations/editLogHour";

interface IProps extends DialogProps {
  logHourData: any;
}

function UpdateLogHour({ open, setOpen, logHourData }: IProps) {
  const taskData: any = useTaskData();
  const queryClient = useQueryClient();

  const { mutate, isLoading: createLoading } = useMutation(updateLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Updated");
      setOpen(false);
      queryClient.invalidateQueries("loghours");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { control, trigger, handleSubmit, reset } = useForm({
    defaultValues: editLogHourDefaultValues,
    mode: "onChange",
    resolver: yupResolver(
      EditLogHourSchema({ taskCreatedDate: taskData?.createdAt })
    ),
  });

  useEffect(() => {
    let hours = moment
      .utc(moment.duration(logHourData?.duration).asMilliseconds())
      .format("HH");
    let minutes = moment
      .utc(moment.duration(logHourData?.duration).asMilliseconds())
      .format("mm");

    reset({
      ...logHourData,
      hours: {
        label: hours,
        value: hours,
      },
      minutes: {
        label: minutes,
        value: minutes,
      },
    });
  }, [logHourData, reset]);

  const onSubmit = (data: any) => {
    const { hours, minutes, user, ...apiData } = data;
    apiData.duration = moment
      .duration(`${data.hours?.value}:${data.minutes?.value}`)
      .asMilliseconds();
    mutate({
      id: logHourData.id,
      data: {
        ...apiData,
      },
    });
  };

  return (
    <DrawerWrapper open={open} title="Update Log Hour" setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
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
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            loading={createLoading}
            fullWidth
            loadingColor="white"
            title="Update Log Hour"
            color="secondary"
            type="submit"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default UpdateLogHour;
