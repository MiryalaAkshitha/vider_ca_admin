import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { updateLogHour } from "api/services/tasks";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";

interface StateProps {
  user: any;
  completedDate: string;
  duration: string;
}

interface Props extends DialogProps {
  selectedItem: any;
}

function EditLogHour({ open, setOpen, selectedItem }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    user: null,
    completedDate: "",
    duration: "",
  });

  const { data, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  useEffect(() => {
    setState({
      ...selectedItem,
      duration: moment.utc(+selectedItem?.duration).format("HH:mm"),
    });
  }, [selectedItem]);

  const { mutate, isLoading: updateLoading } = useMutation(updateLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Updated");
      setOpen(false);
      queryClient.invalidateQueries("loghours");
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
    if (!state.user) {
      snack.error("Please select user");
      return;
    }
    if (!state.duration.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
      snack.error("Please enter duration in HH:MM format");
      return;
    }
    const apiData: any = { ...state };
    apiData.duration = moment.duration(apiData.duration).asMilliseconds();

    mutate({
      id: selectedItem?.id,
      data: apiData,
    });
  };

  return (
    <DrawerWrapper open={open} title="Edit Log Hour" setOpen={setOpen}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, user: value });
            }}
            value={state?.user}
            options={data?.data || []}
            getOptionLabel={(option: any) => {
              return option?.fullName;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Users"
              />
            )}
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            name="completedDate"
            type="date"
            label="Date"
            value={state?.completedDate}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            label="Duration (HH:MM)"
            value={state?.duration}
            name="duration"
            required
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={updateLoading}
              fullWidth
              loadingColor="white"
              title="Update Log Hour"
              color="secondary"
              type="submit"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default EditLogHour;
