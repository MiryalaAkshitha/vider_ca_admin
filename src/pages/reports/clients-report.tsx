import { Box, Breadcrumbs, Typography } from "@mui/material";
import { getClientsReport } from "api/services/reports";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation } from "react-query";
import { handleError } from "utils/handleError";
import Filters from "views/reports/ClientsReport/Filters";
import Report from "views/reports/ClientsReport/Report";

export interface IState {
  fromDate: null | string;
  toDate: null | string;
  status: "All" | "Inactive" | "Active";
  category: string;
  subCategory: string;
}

function ClientsReport() {
  useTitle("Clients Report");
  const [data, setData] = useState(null);
  const [state, setState] = useState<IState>({
    fromDate: null,
    toDate: null,
    status: "All",
    category: "",
    subCategory: "",
  });

  const { mutate, isLoading, isError } = useMutation(getClientsReport, {
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
      active: state.status === "Active" || state.status === "All",
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Clients Report</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} />
      <Report isLoading={isLoading} isError={isError} state={state} data={data} />
    </Box>
  );
}

export default ClientsReport;
