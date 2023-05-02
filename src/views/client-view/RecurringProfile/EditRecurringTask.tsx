import { DesktopDatePicker } from "@mui/lab";
import { Box, Button, Grid, TextField } from "@mui/material";
import { updateTask } from "api/services/tasks/tasks";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";

interface Props extends DialogProps {
  data: any;
}

function EditRecurringProfile({ open, setOpen, data }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate } = useMutation(updateTask, {
    onSuccess: (res) => {
      snack.success("Recurring task updated");
      setOpen(false);
      queryClient.invalidateQueries("recurring-profiles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();

    mutate({
      id: data.id,
      data: { ...state },
    });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Edit Recurring Task">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Name"
              value={data.name}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Start date"
              inputFormat="dd-MM-yyyy"
              value={state?.taskStartDate}
              onChange={(v) => setState({ ...state, taskStartDate: v })}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Due date"
              inputFormat="dd-MM-yyyy"
              value={state?.dueDate}
              onChange={(v) => setState({ ...state, dueDate: v })}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Expected Completion Date"
              inputFormat="dd-MM-yyyy"
              value={state?.expectedCompletionDate}
              onChange={(v) => setState({ ...state, expectedCompletionDate: v })}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </Grid>
        </Grid>
        <Box mt={4} display="flex" gap={1} justifyContent="flex-end">
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="secondary">
            Submit
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default EditRecurringProfile;
