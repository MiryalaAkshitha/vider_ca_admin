import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createSubTask } from "api/services/tasks";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, ResType, SubmitType } from "types";
import { getTitle } from "utils";
import { PriorityEnum } from "data/constants";

interface StateProps {
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  members: any[];
}

function AddSubTask({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();

  const [state, setState] = useState<StateProps>({
    name: "",
    description: "",
    dueDate: "",
    priority: "",
    members: [],
  });

  const { data, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate, isLoading: createLoading } = useMutation(createSubTask, {
    onSuccess: () => {
      snack.success("Sub Task Created");
      setOpen(false);
      queryClient.invalidateQueries("task");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!state.members.length) {
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
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            label="Task Name"
            name="name"
            required
            value={state.name}
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
            value={state.dueDate}
          />
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mt: 3 }}
            select
            required
            name="priority"
            value={state.priority}
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
          <TextField
            sx={{ mt: 2 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            multiline
            rows={4}
            value={state.description}
            label="Description"
            name="description"
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
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddSubTask;
