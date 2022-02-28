import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTask } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType, SubmitType } from "types";
import { getTitle } from "utils";
import { PriorityEnum } from "utils/constants";
import { initialState } from "./initialState";
import { StateProps } from "./types";
import useCreateTaskInitialData from "./useCreateTaskInitialData";

function CreateTask({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({ enabled: open });
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
      setOpen(false);
      setState(initialState);
      queryClient.invalidateQueries("tasks");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    const apiData = { ...state };

    if (!apiData.client?.length) {
      snack.error("Please select atleast one client");
      return;
    }
    apiData.members = apiData.members.map((member: any) => member.id);
    apiData.labels = apiData.labels.map((label: any) => label.id);
    mutate(apiData);
  };

  let subCategories = categories?.data.find(
    (item) => item.id === state.category
  )?.subCategories;

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Task">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, client: value?.map((item) => item?.id) });
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
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mt: 3 }}
            onChange={handleChange}
            select
            required
            value={state.category || ""}
            name="category"
            label="Category"
          >
            {categories?.data.map((item, index) => (
              <MenuItem value={item.id} key={index}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          {subCategories?.length ? (
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 3 }}
              select
              required
              value={state.subCategory || ""}
              onChange={handleChange}
              name="subCategory"
              label="Sub Category"
            >
              {subCategories?.map((item: any, index: number) => (
                <MenuItem key={index} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </TextField>
          ) : null}
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            label="Name"
            name="name"
            required
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            type="date"
            value={state.startDate || ""}
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            name="startDate"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            type="date"
            value={state.dueDate || ""}
            InputLabelProps={{ shrink: true }}
            label="Due Date"
            name="dueDate"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            type="date"
            value={state.expectedCompletionDate || ""}
            InputLabelProps={{ shrink: true }}
            label="Expected Completion Date"
            name="expectedCompletionDate"
          />
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
              return option?.firstName + " " + option?.lastName;
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
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mt: 3 }}
            select
            required
            value={state.taskLeader || ""}
            onChange={handleChange}
            name="taskLeader"
            label="Task Leader"
          >
            {users?.data.map((item, index) => (
              <MenuItem value={item?.id} key={index}>
                {item?.firstName + " " + item?.lastName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mt: 3 }}
            select
            required
            name="priority"
            value={state.priority || ""}
            label="Priority"
            onChange={handleChange}
          >
            {Object.values(PriorityEnum).map((item, index) => (
              <MenuItem key={index} value={item}>
                {getTitle(item)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleChange}
            name="feeAmount"
            label="Fee Amount"
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            size="small"
            onChange={handleChange}
            name="description"
            multiline
            rows={4}
            label="Description"
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
