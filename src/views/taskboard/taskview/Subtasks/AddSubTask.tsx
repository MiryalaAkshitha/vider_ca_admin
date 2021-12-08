import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createSubTask } from "api/tasks";
import { getUsers } from "api/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps } from "types";
import { getTitle } from "utils";
import { PriorityEnum } from "utils/constants";

interface StateProps {
  name: string;
  description: string;
  dueDate: string;
  priority: string | null;
  members: any[];
}

function AddSubTask({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
    dueDate: "",
    priority: null,
    members: [],
  });

  const { data, isLoading }: UseQueryResult<any, Error> = useQuery(
    "users",
    getUsers,
    {
      refetchOnWindowFocus: false,
      enabled: open,
    }
  );

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const { mutate, isLoading: createLoading } = useMutation(createSubTask, {
    onSuccess: () => {
      snack.success("Sub Task Created");
      setOpen(false);
      queryClient.invalidateQueries("subtasks");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.members.length === 0) {
      snack.error("Please select atleast one member");
      return;
    }
    mutate({
      taskId: params.taskId,
      data: state,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Sub Task" setOpen={setOpen}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Box p={2}>
            <TextField
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
              label="Task Name"
              name="name"
              required
            />
            <TextField
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
              multiline
              rows={4}
              label="Description"
              name="description"
            />
            <TextField
              sx={{ mt: 3 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
              size="small"
              name="dueDate"
              type="date"
              label="Due Date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mt: 3 }}
              select
              required
              name="priority"
              onChange={(e) => {
                setState({ ...state, priority: e.target.value });
              }}
              label="Priority"
            >
              {Object.values(PriorityEnum).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {getTitle(item)}
                </MenuItem>
              ))}
            </TextField>
            <Autocomplete
              multiple
              id="tags-standard"
              onChange={(_, value) => {
                setState({ ...state, members: value });
              }}
              value={state.members || []}
              options={data?.data || []}
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
            <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
              <LoadingButton
                loading={createLoading}
                fullWidth
                loadingColor="white"
                title="Create Sub Task"
                color="secondary"
                type="submit"
              />
            </Box>
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddSubTask;
