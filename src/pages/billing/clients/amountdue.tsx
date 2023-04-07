import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography, Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { handleApply, handleFilters, handleSelected } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";
import { colors } from "views/tasks/board/utils";
import { StyledTaskBox } from "views/dashboard/OrgDashboard/styles";
import { handleError } from "utils/handleError";
import { snack } from "components/toast";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getCommonBilling } from "api/services/reports";
import { useState } from "react";

function AmountDue() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const params = useParams();

 
  const { data: result, isLoading, error }: ResType= useQuery(
    ['clientdashboardamountdue', {
        query: 'clientdashboardamountdue',
        clientId: params.clientId
    }],
    getCommonBilling, {
    onSuccess: (result: any) => {
        setData(result?.data);
        console.log(result?.data[0]?.amountdue)
    },
    onError: (err: any) => {
        snack.error(handleError(err));
    },
});
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

  return (
    <StyledTaskBox sx={{ width: "170px", height: "120px" }}>
      <header>
        <Typography variant="h6">Amount Due</Typography>
      </header>
      <main>
        {" "}
        <Typography variant="h6">{result?.data[0]?.amountdue}</Typography>
      </main>
    </StyledTaskBox>
  );
}

export default AmountDue;