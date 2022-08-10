import { DesktopDatePicker } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import DrawerWrapper from "components/DrawerWrapper";
import moment from "moment";
import { useState } from "react";
import { DialogProps } from "types";

interface Props extends DialogProps {
  setFilters: (v: any) => void;
}

function Filters({ open, setOpen, setFilters }: Props) {
  const [dateFilter, setDateFilter] = useState<any>({
    fromDate: null,
    toDate: null,
  });

  const handleApply = () => {
    setFilters({
      ...dateFilter,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setDateFilter({
      fromDate: null,
      toDate: null,
    });
    setFilters({
      fromDate: null,
      toDate: null,
    });
    setOpen(false);
  };

  return (
    <DrawerWrapper title="Filters" open={open} setOpen={setOpen}>
      <Box>
        <DesktopDatePicker
          label="From Date"
          inputFormat="MM/dd/yyyy"
          value={dateFilter.fromDate}
          onChange={(value) => {
            setDateFilter({
              ...dateFilter,
              fromDate: moment(value).format("YYYY-MM-DD"),
            });
          }}
          renderInput={(params) => (
            <TextField fullWidth size="small" {...params} />
          )}
        />
        <DesktopDatePicker
          label="To Date"
          value={dateFilter.toDate}
          inputFormat="MM/dd/yyyy"
          onChange={(value) => {
            setDateFilter({
              ...dateFilter,
              toDate: moment(value).format("YYYY-MM-DD"),
            });
          }}
          renderInput={(params) => (
            <TextField sx={{ mt: 2 }} fullWidth size="small" {...params} />
          )}
        />
        <Box mt={2} display="flex" gap={1} justifyContent="flex-end">
          <Button onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </Button>
          <Button onClick={handleApply} variant="contained" color="secondary">
            Apply
          </Button>
        </Box>
      </Box>
    </DrawerWrapper>
  );
}

export default Filters;
