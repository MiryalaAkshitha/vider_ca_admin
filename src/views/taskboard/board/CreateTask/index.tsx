import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import { createTask } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import {
  createTaskDefaultValues,
  createTaskSchema,
} from "validations/createTask";
import CommonFields from "./CommonFields";
import CustomCommonFields from "./CustomCommonFields";
import NonRecurringFields from "./NonRecurringFields";
import RecurringFields from "./RecurringFields";
import SelectTypes from "./SelectTypes";
import useCreateTaskInitialData from "./useCreateTaskInitialData";

interface Props extends DialogProps {
  successCb?: () => void;
}

function CreateTask({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();

  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({ enabled: open });

  const subcategoriesExist = (category: any) => {
    return categories?.data?.find((item: any) => item.id === parseInt(category))
      ?.subCategories?.length;
  };

  const { watch, control, handleSubmit, setValue, reset } = useForm({
    defaultValues: createTaskDefaultValues,
    mode: "onChange",
    resolver: yupResolver(createTaskSchema({ subcategoriesExist })),
  });

  const { mutate, isLoading } = useMutation(createTask, {
    onSuccess: () => {
      snack.success("Task Created");
      queryClient.invalidateQueries("tasks");
      setOpen(false);
      reset(createTaskDefaultValues);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onFormSubmit = (data: any) => {
    data.client = data.client?.map((client: any) => parseInt(client.value));
    data.members = data.members?.map((member: any) => parseInt(member.value));
    data.labels = data.labels?.map((label: any) => parseInt(label.value));
    data.category = parseInt(data.category);
    data.subCategory = parseInt(data.subCategory);
    data.taskLeader = parseInt(data.taskLeader);
    data.feeAmount = parseFloat(data?.feeAmount);
    data.service = data?.service?._id;
    data.dueDay = parseInt(data.dueDay?.value);
    data.recurringEndDate = data?.neverExpires ? null : data.recurringEndDate;
    mutate(data);
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Task">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <SelectTypes control={control} watch={watch} setValue={setValue} />
          <Box mt={2}>
            <FormAutoComplete
              control={control}
              label="Client"
              multiple
              required
              name="client"
              options={clients?.data?.result?.map((item: any) => ({
                label: item.displayName,
                value: item.id,
              }))}
            />
          </Box>
          {watch("serviceType") === "custom" && (
            <CustomCommonFields
              control={control}
              watch={watch}
              categories={categories}
            />
          )}
          {watch("taskType") === "recurring" && (
            <RecurringFields control={control} watch={watch} />
          )}
          {watch("taskType") === "non_recurring" && (
            <NonRecurringFields control={control} />
          )}
          <CommonFields
            control={control}
            watch={watch}
            labels={labels}
            users={users}
            setValue={setValue}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Task"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default CreateTask;
