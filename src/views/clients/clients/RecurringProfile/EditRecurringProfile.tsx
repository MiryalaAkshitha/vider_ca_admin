import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { useEffect, useState } from "react";
import { DialogProps } from "types";
import { getTitle } from "utils";
import { RecurringFrequency } from "utils/constants";

interface Props extends DialogProps {
  data: any;
}

function EditRecurringProfile({ open, setOpen, data }: Props) {
  const [state, setState] = useState<any>({});

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <DialogWrapper open={open} setOpen={setOpen} title="Edit Recurring Profile">
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Start Date"
            value={data.startDate}
            size="small"
            sx={{
              "& .MuiOutlinedInput-input.Mui-disabled": {
                WebkitTextFillColor: "black",
              },
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            size="small"
            fullWidth
            onChange={(event) => {
              setState({ ...state, frequency: event.target.value });
            }}
            value={state?.frequency || ""}
          >
            {["custom", "monthly", "quarterly", "half_yearly", "yearly"].map(
              (item, index: number) => (
                <MenuItem value={item} key={index}>
                  {getTitle(item)}
                </MenuItem>
              )
            )}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Next recurring date"
            value={data?.nextRecurringDate}
            onChange={(event) => {
              setState({ ...state, nextRecurringDate: event.target.value });
            }}
            size="small"
            type="date"
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
        <Button variant="contained" color="secondary">
          Submit
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default EditRecurringProfile;
