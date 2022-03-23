import { Autocomplete, TextField } from "@mui/material";
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
import CustomSelect from "./CustomSelect";
import CustomTextField from "./CustomTextField";
import FrequencyDates from "./FrequencyDates";
import { RecurringInitialState } from "./initialState";
import SelectCategory from "./SelectCategory";
import { RecurringStateProps } from "./types";
import useCreateTaskInitialData from "./useCreateTaskInitialData";

function CreateRecurringTask() {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({});
  const [state, setState] = useState<RecurringStateProps>(
    RecurringInitialState
  );

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

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    let apiData = { ...state };

    if (!apiData.client?.length) {
      snack.error("Please select atleast one client");
      return;
    }

    apiData.members = apiData.members.map((member: any) => member.id);
    apiData.labels = apiData.labels.map((label: any) => label.id);
    apiData.category = apiData.category?.id;
    apiData.subCategory = apiData.subCategory?.id;
    apiData.taskLeader = apiData.taskLeader?.id;
    mutate(apiData);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="tags-standard"
            multiple
            onChange={(_, value) => {
              setState({ ...state, client: value?.map((v: any) => v.id) });
            }}
            options={clients?.data[0] || []}
            getOptionLabel={(option: any) => option?.displayName}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Client"
              />
            )}
          />
          <SelectCategory
            state={state}
            setState={setState}
            categories={categories?.data}
          />
          <CustomTextField label="Name" name="name" onChange={handleChange} />
          <CustomSelect
            name="frequency"
            options={Object.values(RecurringFrequency).map((item) => ({
              label: item,
              value: item,
            }))}
            value={state.frequency}
            label="Frequency"
            onChange={handleChange}
          />

          {state.frequency && state.frequency !== RecurringFrequency.CUSTOM && (
            <FrequencyDates state={state} setState={setState} />
          )}
          {state.frequency && state.frequency === RecurringFrequency.CUSTOM && (
            <CustomDates state={state} setState={setState} />
          )}
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            required
            size="small"
            type="number"
            inputProps={{ min: 1999, max: 2050 }}
            value={state.financialYear || ""}
            label="Financial Year"
            name="financialYear"
            select
            SelectProps={{ native: true }}
          >
            <option value=""></option>
            {Array.from(Array(50).keys()).map((_, index) => (
              <option value={`${2000 + index}-${2000 + index + 1}`} key={index}>
                {2000 + index}-{2000 + index + 1}
              </option>
            ))}
          </TextField>
          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(_, value) => setState({ ...state, labels: value })}
            value={state?.labels || []}
            options={labels?.data || []}
            sx={{ mt: 3 }}
            getOptionLabel={(option: any) => option?.name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Labels"
              />
            )}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, members: value });
            }}
            value={state.members || []}
            options={users?.data || []}
            sx={{ mt: 3 }}
            getOptionLabel={(option: any) => {
              return option?.fullName;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Members"
              />
            )}
          />
          <Autocomplete
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, taskLeader: value });
            }}
            sx={{ mt: 3 }}
            options={users?.data || []}
            value={state.taskLeader}
            getOptionLabel={(option: any) => option?.fullName}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Task Leader"
              />
            )}
          />
          <CustomSelect
            label="Priority"
            name="priority"
            onChange={handleChange}
            value={state.priority}
            options={Object.values(PriorityEnum)?.map((item) => ({
              label: item,
              value: item,
            }))}
          />
          <CustomTextField
            name="feeAmount"
            label="Fee Amount"
            onChange={handleChange}
          />
          <CustomTextField
            name="description"
            label="Description"
            onChange={handleChange}
            rows={5}
            required={false}
            multiline
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
    </>
  );
}

export default CreateRecurringTask;
