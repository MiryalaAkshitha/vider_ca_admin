import { Box, Breadcrumbs, Typography } from "@mui/material";
import { getEmployeeLogHoursReport, getTasksReport } from "api/services/reports";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation } from "react-query";
import { handleError } from "utils/handleError";
import Filters from "views/reports/TasksReport/Filters";
import Report from "views/reports/TasksReport/Report";

export interface IState {
  fromDate: null | string;
  toDate: null | string;
  client: any;
  members: Array<any>;
  status: string;
  priority: string;
  financialYear: string;
  category: any[];
  subCategory: any[];
}

function TasksReport() {
  useTitle("Tasks Report");
  const [data, setData] = useState(null);
  const [state, setState] = useState<IState>({
    fromDate: null,
    toDate: null,
    client: null,
    members: [],
    status: "",
    priority: "",
    financialYear: "",
    category: [],
    subCategory: [],
  });

  const { mutate, isLoading, isError } = useMutation(getTasksReport, {
    onSuccess: (res: any) => {
      setData(res.data);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = () => {
    mutate({
      ...state,
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
      client: state.client?.id,
      members: state.members?.map((user) => user.id),
      category: state.category?.map((cat) => cat.id),
      subCategory: state.subCategory?.map((cat) => cat.id),
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Tasks Report</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} />
      <Report isLoading={isLoading} isError={isError} state={state} data={data} />
    </Box>
  );
}

export default TasksReport;
