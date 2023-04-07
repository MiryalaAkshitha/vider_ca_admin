import React, { useState, useEffect, useContext } from 'react'
import { Box, Breadcrumbs, Typography } from "@mui/material";
import { getCommonReport } from "api/services/reports";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useMutation } from "react-query";
import { handleError } from "utils/handleError";
import Filters from "views/reports/CommonReport/Filters";
import Report from "views/reports/CommonReport/Report";
import { UserProfileContext } from 'context/UserProfile';

function ReceiptManagementReport() {
  useTitle("ReceiptManagementReport");

  const [data, setData] = useState(null);
  const [state, setState] = useState({
    fromDate: null,
    toDate: null,
  });

  const [payload, setPayload] = useState({});
  const [filterfields, setFilterfields] = useState([
    {type: 'date', label: 'Created From Date', name: 'fromDate'},
    {type: 'date', label: 'Created To Date', name: 'toDate', filter: 'fromDate'}
  ]);

  const { data: user } = useContext(UserProfileContext);
  
  const { mutate, isLoading, isError } = useMutation(getCommonReport, {
    onSuccess: (res: any) => {
      setData(null);
      setTimeout((res) => {
        setData(res.data);
      }, 300, res);      
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = () => {
    if (!state.fromDate) return snack.error("Please Select From Date");
    if (!state.toDate) return snack.error("Please Select To Date");
    setData(null);
    const updatedpayload = {
      query: 'receiptmanagementreport',
      organizationid: ''+user?.organization?.id
    }
    setPayload(updatedpayload);
    
    const updatedstate = Object.assign({}, state, updatedpayload );
    mutate({
      ...updatedstate,         
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports/invoice-reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Invoices</Typography>
        <Typography color="text.primary">ReceiptManagementReport</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} filterfields={filterfields}/>
      <Report isLoading={isLoading} isError={isError} state={state} data={data} payload={payload} />
    </Box>
  )
}

export default ReceiptManagementReport;