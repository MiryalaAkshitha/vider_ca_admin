import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import { createRecurringTask } from "api/services/tasks";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { InputChangeType, SubmitType } from "types";
import { PriorityEnum, RecurringFrequency } from "utils/constants";
import CustomDates from "./CustomDates";
import FrequencyDates from "./FrequencyDates";
import { RecurringInitialState } from "./initialState";
import { RecurringStateProps } from "./types";
import useCreateTaskInitialData from "./useCreateTaskInitialData";
import FormSelect from 'components/FormFields/FormSelect'
import { useForm } from "react-hook-form";
import { CreateRecurringClientSchema, createRecurringTaskDefaultValues } from "validations/createTask";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormInput from "components/FormFields/FormInput";
import FormDate from "components/FormFields/FormDate"
import FormCheckbox from "components/FormFields/FormCheckbox";
import { getTitle } from "utils";

function CreateRecurringTask() {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({});
  const [state, setState] = useState<RecurringStateProps>(
    RecurringInitialState
  );

  const { watch, control, handleSubmit } = useForm({
    defaultValues: createRecurringTaskDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateRecurringClientSchema({
      taskCreatedDate: "2022-01-01",
    })),
  });

  const handleChange = (e: InputChangeType) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation(createRecurringTask, {
    onSuccess: () => {
      snack.success("Recurring Task Created");
      setState(RecurringInitialState);
      queryClient.invalidateQueries("tasks");
      delete queryParams.createTask;
      setQueryParams({ ...queryParams });
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onFormSubmit = (data: any) => {

    if(watch("frequency") === RecurringFrequency.CUSTOM && !state?.customDates.length) {
      snack.error("Please add atleast one custom date, click plus button");
      return;
    }

    data.client = data.client?.map((client: any) => parseInt(client.value));
    data.members = data.members?.map((member: any) => parseInt(member.value));
    data.labels = data.labels?.map((label: any) =>  parseInt(label.value));
    data.category = parseInt(data.category);
    data.subCategory = data.subCategory?.id;
    data.customDates = state?.customDates;
    data.dueDay = parseInt(data?.dueDay?.value);
    mutate(data);
  };

  const renderFrequencyDateInputs = () => {
    if(watch("frequency")) {
      if(watch("frequency") !== RecurringFrequency.CUSTOM)
      return (
        <FrequencyDates state={state} setState={setState}
          recurringStartDate={<FormDate name="recurringStartDate" control={control} label="Recurring Start Date" />}
          dueDate={<FormAutoComplete
            control={control}
            label="Due Day"
            name="dueDay"
            options={Array.from(Array(31), (v, i) => i + 1).map(
              (item: any) => ({
                label: item,
                value: item
              })
            )}
            />
          }
          recurringEndDate = {
            <FormDate name="recurringEndDate" control={control} label="Recurring End Date" />
          }
          neverExpires={
            <FormCheckbox
              name="neverExpires"
              control={control}
              label="Never Expires"
            />
          }
        />
      )

    return (
          <CustomDates state={state} setState={setState} />
      )
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box mt={2}>
            <FormAutoComplete
              control={control}
              label="Client"
              multiple
              name="client"
              options={clients?.data[0]?.map((item: any) => ({
                label: item.displayName,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="category"
              label="Category"
              options={categories?.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
            <FormInput name="name" control={control} label="Name" />
          </Box>
          <Box mt={2}>
            <FormSelect
              control={control}
              name="frequency"
              label="Frequency"
              options={Object.values(RecurringFrequency).map((item) => ({
                label: getTitle(item),
                value: item
              }))}
            />
          </Box>
          {renderFrequencyDateInputs()}
          <Box mt={2}>
           <FormSelect
            control={control}
            name="financialYear"
            label="Finanacial Year"
            options={
              Array.from(Array(50).keys()).map((_, index) => (
                {
                  label: `${(2000 + index)}-${(2000 + index + 1)}`,
                  value: `${(2000 + index)}-${(2000 + index + 1)}`
                }
              ))
            }
            />
          </Box>
           <Box mt={2}>
            <FormAutoComplete
              control={control}
              label="Labels"
              multiple
              name="labels"
              options={labels?.data.map((item: any) => ({
                label: item.name,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
            <FormAutoComplete
              control={control}
              label="Members"
              multiple
              name="members"
              options={users?.data.map((item: any) =>  ({
                label: item.fullName,
                value: item.id,
              }))}
            />
          </Box>
          <Box mt={2}>
           <FormSelect
            control={control}
            name="taskLeader"
            label="Task Leader"
            options={users?.data.map((item: any) => ({
                label: item.fullName,
                value: item.id,
              }))}
            />
          </Box>
           <Box mt={2}>
           <FormSelect
            control={control}
            name="priority"
            label="Priority"
            options={Object.values(PriorityEnum).map((item, index) => ({
                  label: item,
                  value: item
              }))}
            />
          </Box>
            <Box mt={2}>
            <FormInput control={control} name="feeAmount" label="Fee Amount" />
          </Box>
           <Box mt={2}>
            <FormInput control={control} name="description" label="Description" multiline />
          </Box>
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
    </>
  );
}

export default CreateRecurringTask;
