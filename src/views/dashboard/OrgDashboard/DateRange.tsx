import { CalendarMonthOutlined } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import { Box, Typography, IconButton, Popover, TextField, Button } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

function DateRange({ dates: datesProp, setDates: setDatesProp }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dates, setDates] = useState<any>({ fromDate: null, toDate: null });

  useEffect(() => {
    setDates(datesProp);
  }, [datesProp]);

  const handleApply = () => {
    if (!dates.fromDate || !dates.toDate) return;
    setDatesProp(dates);
    setAnchorEl(null);
  };

  const handleClear = () => {
    setDates({ fromDate: null, toDate: null });
    setDatesProp({ fromDate: null, toDate: null });
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display="flex"
        gap={2}
        sx={{
          padding: "5px 10px",
          width: 250,
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {datesProp.fromDate && datesProp.toDate ? (
          <Typography variant="body2">
            {moment(datesProp.fromDate).format("DD/MM/YYYY")} -{" "}
            {moment(datesProp.toDate).format("DD/MM/YYYY")}
          </Typography>
        ) : (
          <Typography variant="body2">Select Date Range</Typography>
        )}
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <CalendarMonthOutlined fontSize="small" />
        </IconButton>
      </Box>
      <Popover
        PaperProps={{
          sx: {
            width: 350,
            py: 4,
            px: 2,
            mt: 1,
            mr: 1,
          },
        }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <DatePicker
          label="From Date"
          inputFormat="dd-MM-yyyy"
          value={dates.fromDate}
          maxDate={dates.toDate}
          onChange={(value) => {
            setDates({
              ...dates,
              fromDate: value,
            });
          }}
          renderInput={(params) => <TextField fullWidth size="small" {...params} />}
        />
        <DatePicker
          label="To Date"
          inputFormat="dd-MM-yyyy"
          value={dates.toDate}
          minDate={dates.fromDate}
          onChange={(value) => {
            setDates({
              ...dates,
              toDate: value,
            });
          }}
          renderInput={(params) => <TextField sx={{ mt: 2 }} fullWidth size="small" {...params} />}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button color="secondary" variant="outlined" size="small" onClick={handleClear}>
            Reset
          </Button>
          <Button color="secondary" variant="outlined" size="small" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default DateRange;
