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

function DetailedOverDueTasksReport() {
  useTitle("Status Category Status Wise Tasks Report");
  const [data, setData] = useState(null);

  const [payload, setPayload] = useState({});
  const [filterfields, setFilterfields] = useState([
    {type: 'date', label: 'Created From Date', name: 'fromDate'},
    {type: 'dropdown', label: 'Users', name: 'users', options: [], optionName:'fullName'}
  ]);

  const [state, setState] = useState({
    fromDate: null,
    users:null
  });

  const { data: user } = useContext(UserProfileContext);

  const { data: users, isLoading: userLoading }: ResType = useQuery(
    ["users"],
    getUsers,
    {
      onSuccess: (res: any) => {
        const filterfieldsstate: any = JSON.parse(JSON.stringify(filterfields));
        filterfieldsstate.forEach((field: any) => {
          if(field.type == 'dropdown') {
            field.options = res.data;
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
    if (!state.fromDate) return snack.error("Please Select Date");
    if(!state.users)return snack.error("Please Select a User")
    const updatedpayload = {
      query: 'detailedoverduetasks',
      organizationid: '' + user?.organization?.id
    }
    setPayload(updatedpayload);

    const updatedstate = Object.assign({}, state, updatedpayload);
    mutate({
      ...updatedstate,
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      users: state.users
    });
  };

  return (
    <Box p={2}>
      <Breadcrumbs>
        <LinkRouter underline="hover" color="inherit" to="/reports">
          Reports
        </LinkRouter>
        <Typography color="text.primary">Users</Typography>
          <Typography color="text.primary">Detailed Over-Due Task</Typography>
      </Breadcrumbs>
      <Filters state={state} setState={setState} onSubmit={handleSubmit} filterfields={filterfields} />
      <Report isLoading={isLoading} isError={isError} state={state} data={data} payload={payload} />
    </Box>
  )
}

export default DetailedOverDueTasksReport