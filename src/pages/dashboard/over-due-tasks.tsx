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
import SearchContainer from "components/SearchContainer";

function TasksByService() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState("");

  const [pageCount, setPageCount] = useState<number>(10);
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";
  const handleRowClick = (v: any) => {
    navigate(`/task-board/${v?.id}#details`);
  };
  const { data, isLoading }: ResType = useQuery(
    ["over-due-tasks", { limit: pageCount, offset: page * pageCount, dashboardType ,search}],
    getOverdueTasks
  );

  const totalCount = data?.data?.totalCount || 0;

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Button
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
        startIcon={<ArrowBack color="secondary" />}
      >
        Over Due Tasks
      </Button>
      <SearchContainer
          value={search}
          debounced
          minWidth="400px"
          onChange={setSearch}
          placeHolder="Search by ClientName"
        />
      </Box>
      <Table
        loading={isLoading}
        data={data?.data?.result}
        onRowClick={handleRowClick}
        pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        columns={[
          {
            key: "taskNumber",
            title: "Task Id",
          },{
            key: "name",
            title: "Task Name",
          },
          {
            title:" Client Name",
            key:"client.displayName",
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
