import React, { useState, useEffect, useContext } from 'react'
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { getCommonReport } from "api/services/reports";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import { handleError } from "utils/handleError";
import Filters from "views/reports/CommonReport/Filters";
import Report from "views/reports/CommonReport/Report";
import { UserProfileContext } from 'context/UserProfile';
import { getUsers } from 'api/services/users';
import { ResType } from 'types';
import { getClients } from 'api/services/clients/clients';

function ClientWiseTasksCompletedToUnBilledReport() {
  useTitle("ClientWiseTasksCompletedToUnBilledReport");
  const [data, setData] = useState(null);

  const [payload, setPayload] = useState({});
  const [filterfields, setFilterfields] = useState([
    // {type: 'date', label: 'Created From Date', name: 'fromDate'},
    // {type: 'date', label: 'Created To Date', name: 'toDate', filter: 'fromDate'},
    {type: 'dropdown', label: 'Client', name: 'clients', options: [], optionName:'displayName'}
  ]);

  const [state, setState] = useState({
    fromDate: null,
    toDate: null,
    clients:null
  });

  const { data: user } = useContext(UserProfileContext);

  const { data: clients, isLoading: userLoading }: ResType = useQuery(
    ["clients"],
    getClients,
    {
      onSuccess: (res: any) => {
        const filterfieldsstate: any = JSON.parse(JSON.stringify(filterfields));
        filterfieldsstate.forEach((field: any) => {
          if(field.type == 'dropdown') {
            field.options = res.data.result;
          }
        });
        setFilterfields(filterfieldsstate);
      }
    }
  );

  const { mutate, isLoading, isError } = useMutation(getCommonReport, {
    onSuccess: (res: any) => {
      setData(res.data);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = () => {
    // if (!state.fromDate) return snack.error("Please select from date");
    // if (!state.toDate) return snack.error("Please select to date");
    if(!state.clients)return snack.error("Please Select a Client")
    
    const updatedpayload = {
      query: 'ClientTasksCompletedToUnBilled',
      organizationid: '' + user?.organization?.id
    }
    setPayload(updatedpayload);

    const updatedstate = Object.assign({}, state, updatedpayload);
    mutate({
      ...updatedstate,
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
      clients: state.clients
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports/invoice-reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Invoices</Typography>
          <Typography color="text.primary">Client-Wise Task Completed To Un-Billed Tasks</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} filterfields={filterfields} />
      <Report isLoading={isLoading} isError={isError} state={state} data={data} payload={payload} />
    </Box>
  )
}

export default ClientWiseTasksCompletedToUnBilledReport;