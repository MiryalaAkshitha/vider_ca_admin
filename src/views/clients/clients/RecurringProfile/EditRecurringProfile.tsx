import { DesktopDatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { updateRecurringProfile } from "api/services/recurring";
import DialogWrapper from "components/DialogWrapper";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, SubmitType } from "types";
import { getTitle } from "utils";

interface Props extends DialogProps {
  data: any;
}

function EditRecurringProfile({ open, setOpen, data }: Props) {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({});

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate } = useMutation(updateRecurringProfile, {
    onSuccess: (res) => {
      snack.success("Recurring profile updated");
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
      data: {
        ...state,
      },
    });
  };

  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Edit Recurring Profile">
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
            <TextField
              disabled
              fullWidth
              label="Task name"
              value={data?.taskData?.name}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              label="Task Category"
              value={data?.taskData?.categoryName}
              size="small"
              sx={{
                "& .MuiOutlinedInput-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Start Date"
              value={data.startDate}
              disabled
              size="small"
              sx={{
                "& .MuiOutlinedInput-input.Mui-disabled": {
                  WebkitTextFillColor: "black",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              size="small"
              fullWidth
              onChange={(event) => {
                setState({ ...state, frequency: event.target.value });
              }}
              value={state?.frequency || ""}
            >
              {["monthly", "quarterly", "half_yearly", "yearly"].map(
                (item, index: number) => (
                  <MenuItem value={item} key={index}>
                    {getTitle(item)}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Next recurring date"
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              value={state?.nextRecurringDate}
              onChange={(v) => setState({ ...state, nextRecurringDate: v })}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <DesktopDatePicker
              label="Recurring end date"
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              value={state?.endDate || null}
              onChange={(v) => setState({ ...state, endDate: v })}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
            <FormControlLabel
              label="Never expires"
              control={
                <Checkbox
                  onChange={(event) => {
                    if (event.target.checked) {
                      setState({ ...state, endDate: null });
                    }
                  }}
                />
              }
              checked={state?.endDate === null}
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
