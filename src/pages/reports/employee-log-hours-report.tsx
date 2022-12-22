import { Box, Breadcrumbs, Typography } from "@mui/material";
import { getEmployeeLogHoursReport } from "api/services/reports";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation } from "react-query";
import { handleError } from "utils/handleError";
import Filters from "views/reports/EmployeeLogHoursReport/Filters";
import Report from "views/reports/EmployeeLogHoursReport/Report";

export interface IState {
  user: any;
  fromDate: null | string;
  toDate: null | string;
}

function EmployeeLogHoursReport() {
  useTitle("Employee Log Hours Report");
  const [data, setData] = useState(null);
  const [state, setState] = useState<IState>({ user: null, fromDate: null, toDate: null });

  const { mutate, isLoading, isError } = useMutation(getEmployeeLogHoursReport, {
    onSuccess: (res: any) => {
      setData(res.data);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = () => {
    if (!state.user) return snack.error("Please select employee");
    if (!state.fromDate) return snack.error("Please select from date");
    if (!state.toDate) return snack.error("Please select to date");
    mutate({
      user: state?.user?.id,
      fromDate: moment(state.fromDate).format("YYYY-MM-DD"),
      toDate: moment(state.toDate).format("YYYY-MM-DD"),
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Employee Log Hours Report</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} />
      <Report isLoading={isLoading} isError={isError} state={state} data={data} />
    </Box>
  );
}

export default EmployeeLogHoursReport;
