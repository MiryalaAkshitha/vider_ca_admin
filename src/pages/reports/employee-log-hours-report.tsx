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
  fromDate: null | string;
  toDate: null | string;
  client: string;
  users: Array<any>;
  type: "ALL" | "GENERAL" | "TASK";
}

function EmployeeLogHoursReport() {
  useTitle("Employee Log Hours Report");
  const [data, setData] = useState(null);
  const [state, setState] = useState<IState>({
    fromDate: null,
    toDate: null,
    client: "",
    users: [],
    type: "ALL",
  });

  const { mutate, isLoading, isError } = useMutation(
    getEmployeeLogHoursReport,
    {
      onSuccess: (res: any) => {
        setData(res.data);
      },
      onError: (err: any) => {
        snack.error(handleError(err));
      },
    }
  );

  const handleSubmit = () => {
    mutate({
      ...state,
      fromDate: state.fromDate
        ? moment(state.fromDate).format("YYYY-MM-DD")
        : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
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
      <Report
        isLoading={isLoading}
        isError={isError}
        state={state}
        data={data}
      />
    </Box>
  );
}

export default EmployeeLogHoursReport;
