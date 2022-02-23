import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getExpenditure } from "api/services/expenditure";
import { noMilestones } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddExpenditure from "./AddExpenditure";
import ExpenditureTable from "./ExpenditureTable";

function Expenditure() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["expenditure", { taskId: params.taskId }],
    getExpenditure
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Expenditure
        </Typography>
        {data?.data?.length ? (
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            startIcon={<Add />}
          >
            Add Expenditure
          </Button>
        ) : null}
      </Box>
      <Box mt={2}>
        {data?.data?.length ? (
          <ExpenditureTable data={data?.data} />
        ) : (
          <NoItems
            img={noMilestones}
            title="Add expenditure for your Task"
            desc="Add additional charges or pure agent for your Task"
            btnTitle="Add Expenditure"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddExpenditure open={open} setOpen={setOpen} />
    </>
  );
}

export default Expenditure;
