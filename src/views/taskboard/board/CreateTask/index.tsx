import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createTask } from "api/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";
import { StateProps } from "types/createTask.types";
import { getTitle } from "utils";
import { PriorityEnum, RecurringFrequency } from "utils/constants";
import { initialState } from "./initialState";
import useCreateTaskInitialData from "./useCreateTaskInitialData";

function CreateTask({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>(initialState);
  const { users, labels, categories, clients, loading } =
    useCreateTaskInitialData({ enabled: open });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate } = useMutation(createTask, {
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let { taskType, ...apiData } = state;
    apiData.members = apiData.members.map((member: any) => member.id);
    mutate(apiData);
  };

  let subCategories = categories?.data.find(
    (item) => item.id === state.category
  )?.subCategories;

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create Task">
      <Box p={2}>
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <Autocomplete
              id="tags-standard"
              onChange={(_, value) => {
                setState({ ...state, client: value?.id });
              }}
              options={clients?.data[0] || []}
              sx={{ mt: 3 }}
              getOptionLabel={(option: any) => option?.displayName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
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
                {subCategories?.map((item: any, index) => (
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
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 3 }}
              select
              required
              value={state.taskType || ""}
              name="type"
              onChange={(e) => {
                setState({
                  ...state,
                  recurring: e.target.value === "recurring",
                  taskType: e.target.value,
                });
              }}
              label="Task Type"
            >
              <MenuItem value="non_recurring">None-recurring</MenuItem>
              <MenuItem value="recurring">Recurring</MenuItem>
            </TextField>
            {state.recurring && (
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{ mt: 3 }}
                select
                required
                name="frequency"
                value={state.frequency || ""}
                label="Frequency"
                onChange={handleChange}
              >
                {Object.values(RecurringFrequency).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {getTitle(item)}
                  </MenuItem>
                ))}
              </TextField>
            )}
            {state.taskType === "non_recurring" && (
              <>
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
              </>
            )}
            {state.taskType === "recurring" && (
              <>
                <Autocomplete
                  id="tags-standard"
                  onChange={(_, value) => {
                    setState({
                      ...state,
                      startDay: value,
                    });
                  }}
                  options={Array.from(Array(31), (v, i) => i + 1)}
                  sx={{ mt: 3 }}
                  getOptionLabel={(option: any) => option.toString()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="startDay"
                      label="Start Day"
                    />
                  )}
                />
                <Autocomplete
                  id="tags-standard"
                  onChange={(_, value) => {
                    setState({
                      ...state,
                      dueDay: value,
                    });
                  }}
                  options={Array.from(Array(31), (v, i) => i + 1)}
                  sx={{ mt: 3 }}
                  getOptionLabel={(option: any) => option.toString()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      fullWidth
                      name="dueDay"
                      label="Due Day"
                    />
                  )}
                />
              </>
            )}
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Task End Date"
              name="endDate"
            />
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
                loading={false}
                fullWidth
                type="submit"
                loadingColor="white"
                title="Create Task"
                color="secondary"
              />
            </Box>
          </form>
        )}
      </Box>
    </DrawerWrapper>
  );
}

export default CreateTask;
