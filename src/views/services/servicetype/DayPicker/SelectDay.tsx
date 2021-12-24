import { Dialog, Grid, MenuItem, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { DialogProps } from "types";
import { MONTHS } from "utils/constants";

interface SelectDayProps extends DialogProps {
  onChange: (v: string) => void;
}

function SelectDay({ open, setOpen, onChange }: SelectDayProps) {
  const [days, setDays] = useState(0);
  const [month, setMonth] = useState<number>(0);

  const year = new Date().getFullYear();
  const getDays = (e: any) => {
    setMonth(e.target.value);
    const days = moment(`${year}-${e.target.value}`).daysInMonth();
    setDays(days);
  };

  const handleChange = (e: any) => {
    onChange(`${e.target.value}, ${MONTHS[month - 1]}`);
    setOpen(false);
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { px: 2, py: 3, minHeight: 100 } }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Typography color="primary" mb={3}>
        Select Month and Day
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            onChange={getDays}
            fullWidth
            size="small"
            label="Select Month"
            select
          >
            {MONTHS.map((item, index) => (
              <MenuItem key={index} value={index + 1}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={handleChange}
            fullWidth
            size="small"
            label="Select Day"
            select
          >
            {Array.from(Array(days)).map((item, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default SelectDay;
