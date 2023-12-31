import { Add, MoreVert, Visibility } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { deleteLogHour, getUserLogHours, getUserLogHourStats } from "api/services/tasks/loghours";
import { icons } from "assets";
import FormattedDate from "components/FormattedDate";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import AddLogHour from "./AddLogHour";
import EditLogHour from "./EditLogHour";
import Filters from "./Filters";
import ViewLogHour from "./ViewLogHour";

function LogHours() {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(5);
  const [filters, setFilters] = useState({
    search: "",
    fromDate: null,
    toDate: null,
  });

  const { data: logHourStats, isLoading: logHourStatsLoading }: ResType = useQuery(
    ["user-log-hour-stats", { type: "SELF" }],
    getUserLogHourStats
  );

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

  const getDuration = (duration: number) => {
    return Math.round(duration / 1000 / 60 / 60);
  };

  const totalCount = data?.data?.totalCount || 0;
  const generalLogHours = +logHourStats?.data?.generalLogHours;
  const taskLogHours = +logHourStats?.data?.taskLogHours;
  const totalLogHours = generalLogHours + taskLogHours;

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
        setFilters={(v: any) => setFilters({ ...filters, ...v })}
        open={open}
        setOpen={setOpen}
      />
      <AddLogHour open={openAdd} setOpen={setOpenAdd} />
    </Box>
  );
}

export const columns = [
  {
    title: "Date",
    key: "completedDate",
    render: (row: any) => <FormattedDate date={row.completedDate} />,
  },
  {
    title: "Type",
    key: "type",
  },
  {
    title: "Task Name/Title",
    key: "",
    render: (row: any) => {
      return row.type === "GENERAL" ? row?.title : row?.task?.name;
    },
  },
  {
    title: "Client Name",
    key: "client.displayName",
  },
  {
    title: "Duration",
    key: "duration",
    render: (row: any) => {
      return moment.utc(+row?.duration).format("HH:mm");
    },
  },
  {
    title: "Actions",
    key: "",
    render: (row: any) => <Actions data={row} />,
  },
];

export const StatCard = ({ title, value, img }) => (
  <Paper sx={{ p: 1, boxShadow: "none", border: "1px solid lightgrey" }}>
    <Box display="flex" gap={2} alignItems="center">
      <div>
        <img src={img} alt="" width="40px" />
      </div>
      <Box flex={1}>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  </Paper>
);

const Actions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const queryClient = useQueryClient();
  const menu = useMenu();
  const confirm = useConfirm();

  const { mutate } = useMutation(deleteLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Deleted");
      queryClient.invalidateQueries("user-log-hours");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this log hour?",
      action: () => mutate(data?.id),
    });
  };

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <Box>
      <Box>
        <IconButton onClick={() => setViewOpen(true)}>
          <Visibility />
        </IconButton>
        <IconButton onClick={handleMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <EditLogHour open={open} setOpen={setOpen} logHourData={data} />
      <ViewLogHour open={viewOpen} setOpen={setViewOpen} data={data} />
    </Box>
  );
};

export default LogHours;
