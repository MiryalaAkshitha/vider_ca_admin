import { Delete } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/lab";
import { Box, Button, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { RecurringFrequency } from "data/constants";
import { halfYears, months, quarters } from "data/periods";
import moment from "moment";
import { useRef, useState } from "react";
import { getTitle } from "utils";
import { getFinancialYears } from "utils/getFinancialYears";

type State = {
  financialYear: string;
  frequency: string;
  startPeriod: string;
  dates: Array<{
    startDate: string | null;
    dueDate: string | null;
    period: string;
  }>;
};

function RecurringFrequencyDetails(props: any) {
  const { open, setOpen, setValue } = props;
  const [startPeriods, setStartPeriods] = useState<string[]>([]);
  const [state, setState] = useState<State>({
    financialYear: "",
    frequency: "",
    startPeriod: "",
    dates: [],
  });
  const boxRef = useRef<HTMLDivElement>(null);

  const handleFreqChange = (frequency: any) => {
    let result: string[] = [];

    if (frequency === RecurringFrequency.MONTHLY) {
      result = months;
    }

    if (frequency === RecurringFrequency.QUARTERLY) {
      result = quarters;
    }

    if (frequency === RecurringFrequency.HALF_YEARLY) {
      result = halfYears;
    }

    if (frequency === RecurringFrequency.YEARLY) {
      setStartPeriods([]);
      setState({
        ...state,
        frequency,
        startPeriod: "",
        dates: [{ startDate: null, dueDate: null, period: "Yearly" }],
      });

      return;
    }

    if (frequency === RecurringFrequency.CUSTOM) {
      setStartPeriods([]);
      setState({
        ...state,
        frequency,
        startPeriod: "",
        dates: [{ startDate: null, dueDate: null, period: "" }],
      });
      return;
    }

    setStartPeriods(result);
    setState({
      ...state,
      frequency,
      startPeriod: "",
      dates: [],
    });
  };

  const handleStartPeriodChange = (v: string) => {
    let dates: any = [];

    startPeriods.slice(startPeriods.indexOf(v)).forEach((v) => {
      dates.push({
        period: v,
        startDate: null,
        dueDate: null,
      });
    });

    setState({
      ...state,
      startPeriod: v,
      dates: dates,
    });
  };

  const handleSave = () => {
    if (!state.financialYear) {
      snack.error("Please select a financial year");
      return;
    }

    if (!state.frequency) {
      snack.error("Please select a frequency");
      return;
    }

    if (
      state.frequency !== RecurringFrequency.YEARLY &&
      state.frequency !== RecurringFrequency.CUSTOM &&
      !state.startPeriod
    ) {
      snack.error("Please select a start period");
      return;
    }

    let emptyDates = state.dates.some((v) => !v.startDate || !v.dueDate || !v.period);

    if (emptyDates) {
      snack.error("Please select a start, due date and period for each row");
      return;
    }

    setValue("financialYear", state.financialYear);
    setValue("frequency", state.frequency);
    setValue("dates", state.dates);
    setOpen(false);
  };

  return (
    <DialogWrapper title="Recurring Frequency Details" open={open} setOpen={setOpen}>
      <TextField
        label="Financial Year"
        select
        size="small"
        fullWidth
        value={state.financialYear}
        onChange={(e) => {
          setState({ ...state, financialYear: e.target.value });
        }}
      >
        {getFinancialYears().map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <Box mt={2}>
        <TextField
          label="Frequency"
          select
          size="small"
          fullWidth
          value={state.frequency}
          onChange={(e) => handleFreqChange(e.target.value)}
        >
          {Object.values(RecurringFrequency).map((item) => (
            <MenuItem key={item} value={item}>
              {getTitle(item)}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {startPeriods.length > 0 && (
        <Box mt={2}>
          <TextField
            label="Start Period"
            select
            size="small"
            fullWidth
            value={state.startPeriod}
            onChange={(e) => handleStartPeriodChange(e.target.value)}
          >
            {startPeriods.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
      {state.dates.length > 0 && (
        <Box
          mt={2}
          ref={boxRef}
          bgcolor="#F7F7F7"
          px={1}
          py={1}
          sx={{ maxHeight: 300, overflow: "auto" }}
        >
          <Box display="flex" mb={1}>
            <Typography variant="body2">Select Dates</Typography>
          </Box>
          {state.dates.map((item: any, index: number) => (
            <Box mb={2}>
              <Typography variant="caption" color="rgba(0,0,0,0.6)">
                {item.period}
              </Typography>
              <Box display="flex" gap={1} mt="8px">
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="dd-MM-yyyy"
                  value={item.startDate}
                  onChange={(v) => {
                    let dates = [...state.dates];
                    dates[index].startDate = moment(v).format("YYYY-MM-DD");
                    setState({ ...state, dates });
                  }}
                  renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
                <DesktopDatePicker
                  label="Due Date"
                  inputFormat="dd-MM-yyyy"
                  value={item.dueDate}
                  onChange={(v) => {
                    let dates = [...state.dates];
                    dates[index].dueDate = moment(v).format("YYYY-MM-DD");
                    setState({ ...state, dates });
                  }}
                  renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                />
                {state.frequency === RecurringFrequency.CUSTOM && (
                  <TextField
                    fullWidth
                    size="small"
                    label="Period"
                    onChange={(e) => {
                      let dates = [...state.dates];
                      dates[index].period = e.target.value;
                      setState({ ...state, dates });
                    }}
                    value={item.period}
                  />
                )}
                {state.frequency === RecurringFrequency.CUSTOM && (
                  <IconButton
                    size="small"
                    onClick={() => {
                      let dates = [...state.dates];
                      dates.splice(index, 1);
                      setState({ ...state, dates });
                    }}
                  >
                    <Delete fontSize="small" color="secondary" />
                  </IconButton>
                )}
              </Box>
            </Box>
          ))}
          {state.frequency === RecurringFrequency.CUSTOM && (
            <Box mt={1} textAlign="right">
              <Button
                color="secondary"
                onClick={() => {
                  setState({
                    ...state,
                    dates: [...state.dates, { startDate: null, dueDate: null, period: "" }],
                  });
                }}
              >
                + Add Date
              </Button>
            </Box>
          )}
        </Box>
      )}
      <Box mt={2} textAlign="center">
        <Button onClick={handleSave} variant="contained" color="secondary" size="large">
          Save
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default RecurringFrequencyDetails;
