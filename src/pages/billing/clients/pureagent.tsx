import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography, Box, Grid, Divider } from "@mui/material";
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
import { useState } from "react";
import { snack } from "components/toast";
import { handleError } from "utils/handleError";

function PureAgent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  // clientpureagentreceivedanddue
  const params = useParams();

  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientpureagentreceivedanddue', {
        query: 'clientpureagentreceivedanddue',
        clientId: params.clientId
    }],
    getCommonBilling, {
    onSuccess: (result: any) => {
        setData(result?.data);
        console.log(result?.data)
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
    <StyledTaskBox sx={{height:"250px",width:"300px"}}>
      <header>
        <Typography variant="h6">Pure Agent</Typography>
      </header>
      <main style={{display:"flex",flexDirection:"column",gap:"70px"}}>
        <Box>
          <Typography variant="h6">
            Amount Received :   {result?.data[0]?.pureagentamountreceived}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6">
            Amount Due :  {result?.data[0]?.pureagentamountdue}
          </Typography>
        </Box>
      </main>
    </StyledTaskBox>
  );
}

export default PureAgent;
