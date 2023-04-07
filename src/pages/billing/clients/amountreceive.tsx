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

function AmountReceive() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [data, setData] = useState();

  const handleClick = (v: any) => {
    dispatch(handleSelected("status"));
    dispatch(
      handleFilters({
        checked: true,
        value: { label: getTitle(v.key), value: v.key },
      })
    );
    dispatch(handleApply());
    navigate("/task-board");
  };
  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientdashboardamountreceived', {
        query: 'clientdashboardamountreceived',
        clientId: params.clientId
    }],
    getCommonBilling, {
    onSuccess: (result: any) => {
        setData(result?.data);
        console.log(result?.data[0].amountrecieved)
    },
    onError: (err: any) => {
        snack.error(handleError(err));
    },
});
  return (
    <StyledTaskBox sx={{ width: "170px", height: "120px" }}>
      <header>
        
        <Typography variant="h6">Amount Received</Typography>
      </header>
      <main>
          <Typography variant="h6">{result?.data[0].amountrecieved}</Typography>
      </main>
    </StyledTaskBox>
  );
}

export default AmountReceive;
