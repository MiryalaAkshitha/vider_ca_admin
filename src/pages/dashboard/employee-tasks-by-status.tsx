import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { getEmployeeTasksByStatus } from "api/services/organization";
import Loader from "components/Loader";
import Table from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import DateRange from "views/dashboard/OrgDashboard/DateRange";

function TasksByService() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [dates, setDates] = useState({ fromDate: null, toDate: null });
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    [
      "employee-tasks-by-status",
      { limit: pageCount, offset: page * pageCount, dashboardType, ...dates },
    ],
    getEmployeeTasksByStatus
  );

  const totalCount = data?.data?.totalCount || 0;

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBack color="secondary" />}>
          Employee Tasks By Status
        </Button>
        <DateRange dates={dates} setDates={setDates} />
      </Box>
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
          {
            key: "total",
            title: "Total",
            render: (row: any) => {
              return +row.todo + +row.inProgress + +row.onHold + +row.underReview + +row.done;
            },
          },
        ]}
      />
    </Box>
  );
}

export default TasksByService;
