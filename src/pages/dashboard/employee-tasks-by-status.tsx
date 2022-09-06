import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { getEmployeeTasksByStatus } from "api/services/organization";
import Loader from "components/Loader";
import Table from "components/Table";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getDuration } from "utils/getDuration";

function TasksByService() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);

  const { data, isLoading }: ResType = useQuery(
    ["employee-tasks-by-status", { limit: pageCount, offset: page * pageCount }],
    getEmployeeTasksByStatus
  );

  const totalCount = data?.data?.totalCount || 0;

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Button
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
        startIcon={<ArrowBack color="secondary" />}
      >
        Employee Tasks By Status
      </Button>
      <Table
        loading={isLoading}
        data={data?.data?.result}
        pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        columns={[
          {
            key: "fullName",
            title: "Employee Name",
          },
          {
            key: "totalLogHours",
            title: "Total Log Hours",
            render: (row: any) => <> {getDuration(row?.totalLogHours)}</>,
          },
          {
            key: "todo",
            title: "Todo",
          },
          {
            key: "inProgress",
            title: "In Progress",
          },
          {
            key: "onHold",
            title: "On Hold",
          },
          {
            key: "underReview",
            title: "Under Review",
          },
          {
            key: "done",
            title: "Done",
          },
        ]}
      />
    </Box>
  );
}

export default TasksByService;
