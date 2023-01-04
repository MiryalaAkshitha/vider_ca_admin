import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { getOverdueTasks } from "api/services/organization";
import Loader from "components/Loader";
import Table from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";

function TasksByService() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["over-due-tasks", { limit: pageCount, offset: page * pageCount, dashboardType }],
    getOverdueTasks
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
        Over Due Tasks
      </Button>
      <Table
        loading={isLoading}
        data={data?.data?.result}
        pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        columns={[
          {
            key: "name",
            title: "Name",
          },
          {
            key: "taskNumber",
            title: "Task Id",
          },
          {
            title: "Due Date",
            key: "dueDate",
            render: (row: any) => moment(row?.dueDate).format("DD MMM YYYY"),
          },
          {
            title: "Over Due by",
            key: "",
            render: (row: any) => moment().diff(row?.dueDate, "days") + " days",
          },
        ]}
      />
    </Box>
  );
}

export default TasksByService;
