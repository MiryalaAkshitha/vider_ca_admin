import ArrowBack from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";
import { getTasksByService } from "api/services/organization";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getDuration } from "utils/getDuration";
import DateRange from "views/dashboard/OrgDashboard/DateRange";

function TasksByService() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [dates, setDates] = useState({ fromDate: null, toDate: null });
  const { queryParams } = useQueryParams();
  const [search, setSearch] = useState("");

  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["task-by-service", { limit: pageCount, offset: page * pageCount, dashboardType,search, ...dates }],
    getTasksByService
  );

  const totalCount = data?.data?.totalCount || 0;

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={() => navigate(-1)} startIcon={<ArrowBack color="secondary" />}>
          Tasks By Service
        </Button>
        <Box sx={{display:"flex" ,gap:"20px"}}>
        <DateRange dates={dates} setDates={setDates} />
        <SearchContainer value={search} onChange={setSearch} debounced placeHolder="Search by Service Name"/>
        </Box>
      </Box>
      <Table
        loading={isLoading}
        data={data?.data?.result}
        pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        columns={[
          {
            key: "name",
            title: " Service Name",
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
