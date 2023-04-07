import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";
import { colors } from "views/tasks/board/utils";
import { StyledTaskBox } from "views/dashboard/OrgDashboard/styles";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getCommonBilling } from "api/services/reports";
import { handleError } from "utils/handleError";
import { snack } from "components/toast";
import { useState } from "react";

function DashboardUnbilledTasks() {
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();

 
  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientdashboardinvoiceunbilled', {
        query: 'clientdashboardinvoiceunbilled',
        clientId: params.clientId
    }],
    getCommonBilling, {
    onSuccess: (res: any) => {
        setData(res?.data);
    },
    onError: (err: any) => {
        snack.error(handleError(err));
    },
});

 

  return (
    <StyledTaskBox sx={{ width: "170px", height: "120px",marginBottom:"10px" }}>
      <header>
        <Typography variant="h6">Unbilled Tasks</Typography>
      </header>
      <main>
        <Typography variant="h6">{result?.data[0]?.total}</Typography>
      </main>
      
    </StyledTaskBox>
  );
}

export default DashboardUnbilledTasks;
