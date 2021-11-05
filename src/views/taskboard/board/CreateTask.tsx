import { Close } from "@mui/icons-material";
import {
  AppBar,
  Autocomplete,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/categories";
import { getClients } from "api/client";
import { getLabels } from "api/labels";
import { createTask } from "api/tasks";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { CategoryResponse } from "pages/categories";
import React, { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { DataResponse, DialogProps } from "types";
import { PriorityEnum, RecurringFrequency } from "utils/constants";
import { getTitle } from "./utils";

type DataResponseType = UseQueryResult<CategoryResponse, Error>;
type LabelsDataResponse = UseQueryResult<DataResponse, Error>;
type ClientsDataResponse = UseQueryResult<DataResponse, Error>;

interface StateProps {
  name: string;
  category: number | null;
  labels: any[];
  client: number | null;
  recurring: boolean;
  frequency: string | null;
  feeAmount: string | null;
  priority: string | null;
  dueDate: string | null;
}

const initialState = {
  name: "",
  category: null,
  labels: [],
  client: null,
  recurring: false,
  frequency: null,
  feeAmount: null,
  priority: null,
  dueDate: null,
};

function CreateTask({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>(initialState);

  const { data: categories, isLoading: categoriesLoading }: DataResponseType =
    useQuery("categories", getCategories, {
      refetchOnWindowFocus: false,
      enabled: open,
    });

  const { data: clients, isLoading: clientsLoading }: ClientsDataResponse =
    useQuery(["clients", {}], getClients, {
      refetchOnWindowFocus: false,
      enabled: open,
    });

  const { data: labels, isLoading: labelsLoading }: LabelsDataResponse =
    useQuery("labels", getLabels, {
      refetchOnWindowFocus: false,
      enabled: open,
    });

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
    mutate(state);
  };

  let subCategories = categories?.data.find(
    (item) => item.id === state.category
  )?.subCategories;

  return (
    <Drawer
      anchor="right"
      PaperProps={{ sx: { width: 550 } }}
      open={open}
      onClose={setOpen}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Create Task</Typography>
          <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        {categoriesLoading || clientsLoading || labelsLoading ? (
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
                name="category"
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
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Due Date"
              name="dueDate"
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 3 }}
              select
              required
              name="type"
              onChange={(e) => {
                setState({
                  ...state,
                  recurring: e.target.value === "recurring",
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
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 3 }}
              select
              required
              name="priority"
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
              onChange={handleChange}
              size="small"
              name="feeAmount"
              label="Fee Amount"
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
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
    </Drawer>
  );
}

export default CreateTask;
