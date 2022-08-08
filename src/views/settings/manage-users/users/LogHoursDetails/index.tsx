import { Add } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button, Grid } from "@mui/material";
import {
  addUserLogHour,
  getUserLogHours,
  getUserLogHourStats,
} from "api/services/tasks/loghours";
import { icons } from "assets";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import { columns, StatCard } from "../LogHours";
import AddLogHour from "../LogHours/AddLogHour";
import Filters from "../LogHours/Filters";

function LogHours() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [filters, setFilters] = useState({
    search: "",
    fromDate: null,
    toDate: null,
  });

  const { data: logHourStats, isLoading: logHourStatsLoading }: ResType =
    useQuery(["user-log-hour-stats", { type: "SELF" }], getUserLogHourStats);

  const { data, isLoading }: ResType = useQuery(
    [
      "user-log-hours",
      {
        type: "SELF",
        offset: page * pageCount,
        limit: pageCount,
        search: filters.search,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      },
    ],
    getUserLogHours
  );

  const { mutateAsync } = useMutation(addUserLogHour, {
    onSuccess: () => {
      queryClient.invalidateQueries("user-log-hours");
      snack.success("Log Hour Added");
      setOpenAdd(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onAdd = async (data: any) => {
    await mutateAsync({
      ...data,
      type: "SELF",
    });
  };

  const totalCount = data?.data?.totalCount || 0;
  const generalLogHours = +logHourStats?.data?.generalLogHours;
  const taskLogHours = +logHourStats?.data?.taskLogHours;
  const totalLogHours = generalLogHours + taskLogHours;

  const getDuration = (duration: number) => {
    return Math.round(duration / 1000 / 60 / 60);
  };

  if (logHourStatsLoading) return <Loader />;

  return (
    <Box>
      <Grid container mb={3} spacing={3}>
        <Grid item xs={4}>
          <StatCard
            title="Total Number of general log hours"
            value={getDuration(generalLogHours)}
            img={icons.totalClients}
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            title="Total Number of task log hours"
            value={getDuration(taskLogHours)}
            img={icons.totalTasks}
          />
        </Grid>
        <Grid item xs={4}>
          <StatCard
            title="Total Number of log hours"
            value={getDuration(totalLogHours)}
            img={icons.taskCompleted}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <SearchContainer
            debounced
            onChange={(v) => {
              setFilters({
                ...filters,
                search: v,
              });
            }}
          />
          <Button
            onClick={() => setOpen(true)}
            startIcon={<FilterAltOutlinedIcon />}
            variant="outlined"
          >
            Filter
          </Button>
        </Box>
        <Button
          onClick={() => setOpenAdd(true)}
          startIcon={<Add />}
          color="secondary"
          variant="outlined"
        >
          Add Log Hour
        </Button>
      </Box>
      <Box mt={2}>
        <Table
          columns={columns}
          loading={isLoading}
          data={data?.data?.result || []}
          pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
        />
      </Box>
      <Filters
        setFilters={(v: any) => {
          setFilters({
            ...filters,
            ...v,
          });
        }}
        open={open}
        setOpen={setOpen}
      />
      <AddLogHour onAdd={onAdd} open={openAdd} setOpen={setOpenAdd} />
    </Box>
  );
}

export default LogHours;
