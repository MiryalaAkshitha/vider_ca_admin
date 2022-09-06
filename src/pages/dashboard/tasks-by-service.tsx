import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { getTasksByService } from "api/services/organization";
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
  const [pageCount, setPageCount] = useState<number>(10);

  const { data, isLoading }: ResType = useQuery(
    ["task-by-service", { limit: pageCount, offset: page * pageCount }],
    getTasksByService
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
        Tasks By Service
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
            key: "count",
            title: "Number of Tasks",
          },
          {
            key: "totalLogHours",
            title: "Total Log Hours",
            render: (row: any) => <> {getDuration(row?.totalLogHours)}</>,
          },
        ]}
      />
    </Box>
  );
}

export default TasksByService;
