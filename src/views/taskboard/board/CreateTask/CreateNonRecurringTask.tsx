import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTask } from "api/services/tasks";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { InputChangeType, SubmitType } from "types";
import { getTitle } from "utils";
import { PriorityEnum } from "utils/constants";
import { initialState } from "./initialState";
import { StateProps } from "./types";
import useCreateTaskInitialData from "./useCreateTaskInitialData";
import FormSelect from 'components/FormFields/FormSelect'
import { useForm } from "react-hook-form";
import { CreateNonRecurringClientSchema, createNonRecurringTaskDefaultValues } from "validations/createTask";
import FormAutoComplete from "components/FormFields/FormAutocomplete";
import FormInput from "components/FormFields/FormInput";
import FormDate from "components/FormFields/FormDate";

function CreateNonRecurringTask() {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({});
  const [state, setState] = useState<StateProps>(initialState);

  const handleChange = (e: InputChangeType) => {
    if (e.target.name === "category") {
      setState({ ...state, category: +e.target.value, subCategory: null });
      return;
    }
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading } = useMutation(createTask, {
    onSuccess: () => {
      snack.success("Task Created");
      delete queryParams.createTask;
      setQueryParams({ ...queryParams });
      setState(initialState);
      queryClient.invalidateQueries("tasks");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { watch, control, handleSubmit } = useForm({
    defaultValues: createNonRecurringTaskDefaultValues,
    mode: "onChange",
    resolver: yupResolver(CreateNonRecurringClientSchema),
  });


  const onFormSubmit = (data: any) => {
    data.client = data.client?.map((client: any) => parseInt(client.value));
    data.members = data.members?.map((member: any) => parseInt(member.value));
    data.labels = data.labels?.map((label: any) =>  parseInt(label.value));
    data.category = parseInt(data.category);
    data.subCategory = data.subCategory?.id;
    mutate(data);
  };

  let subCategories = categories?.data.find(
      (item) => item.value === watch("category")
  )?.subCategories;

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
         {subCategories && (
            <Box mt={2}>
              <FormSelect
                control={control}
                name="subCategory"
                label="Sub Category"
                options={subCategories.map((item: any) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Box>
          )}
           <Box mt={2}>
            <FormInput name="name" control={control} label="Name" />
          </Box>
          <Box mt={2}>
             <FormDate name="startDate" control={control} label="Start Date" />
          </Box>
          <Box mt={2}>
             <FormDate name="dueDate" control={control} label="Due Date" />
          </Box>
          <Box mt={2}>
             <FormDate name="expectedCompletionDate" control={control} label="Expected Completion Date" />
          </Box>
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
                  label: getTitle(item),
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

export default CreateNonRecurringTask;
