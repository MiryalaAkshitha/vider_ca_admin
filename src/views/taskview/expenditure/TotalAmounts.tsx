import { Grid, Typography } from "@mui/material";

function TotalAmounts({ data, taskFee }) {
  console.log(data,"exp data")
  const pureAgentExpenditure = data
    ?.filter((item: any) => item.taskExpenseType === "PURE_AGENT")
    ?.reduce((acc: any, curr: any) => {
      return acc + parseInt(curr.amount);
      }, 0);
    console.log("Pureagent exp",pureAgentExpenditure);


  const additionalExpenditure = data
    ?.filter((item: any) => item.taskExpenseType === "ADDITIONAL")
    ?.reduce((acc: any, curr: any) => {
      return acc + parseInt(curr.amount);
    }, 0);
console.log("additional exp",additionalExpenditure);
  const totalAmount =
    (+taskFee || 0) + pureAgentExpenditure + additionalExpenditure;

  return (
    <Grid
      container
      sx={{
        background: "#F7F7F7",
        mt: 2,
        borderRadius: 4,
        p: 2,
      }}
    >
      <Grid item xs={3}>
        <Typography variant="body2" color="primary" gutterBottom>
          Fee
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="black">
          {taskFee ? `${taskFee}/-` : "NA"}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" color="primary" gutterBottom>
          Pure Agent
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="black">
          {pureAgentExpenditure}/-
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" color="primary" gutterBottom>
          Additional charges
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="black">
          {additionalExpenditure}/-
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" color="primary" gutterBottom>
          Total
        </Typography>
        <Typography variant="subtitle2" gutterBottom color="black">
          {totalAmount}/-
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TotalAmounts;
