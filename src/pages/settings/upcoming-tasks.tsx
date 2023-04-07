import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import { useQuery } from "react-query";
import { ResType } from "types";
import Members from "components/Members";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import AllFiltersDialog from "views/tasks/Filters/AllFiltersDialog";
import AppliedFilters from "views/tasks/Filters/ApplidedFilters";
import SearchContainer from "components/SearchContainer";
import { handleSearch, selectTaskBoard } from "redux/reducers/taskboardSlice";
import { useDispatch, useSelector } from "react-redux";
import useQueryParams from "hooks/useQueryParams";
import { ViewType } from "types";
import { useUserData } from "context/UserProfile";
import moment from "moment";
import { getTasks } from "api/services/tasks/tasks";
import { useNavigate } from "react-router-dom";

function UpcomingTasks() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { queryParams } = useQueryParams();
  
  const { search, appliedFilters } = useSelector(selectTaskBoard);

  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const [pendingTasks, setPendingTasks] = useState([]);
  
  // userdata
  const { data: user } = useUserData();

  const getFiltersData = () => {
    let result = {};
    let { customDates, ...remFilters } = appliedFilters;

    Object.keys(remFilters).forEach((key) => {
      result[key] = remFilters[key].map((item: any) => item.value);
    });

    return {
      ...result,
      customDates,
    };
  };

  const { data, isLoading }: ResType = useQuery(
    ["tasks", {
      pending: 'pending',
      search: search,
      ...getFiltersData(),
    },
    ],
    getTasks,
    {
      onSuccess: (res: any) => {
        console.log(res);
        res?.data && res?.data.length > 0 && res?.data.forEach((task: any, index: any) => {
          task['sno'] = index + 1
        });
        setPendingTasks(res?.data);
      },
      cacheTime: 0,
    }
  );

  return (
    <Box>
      <>
        <Box display="flex" gap={3} justifyContent="space-between" mt={1}>
          <Box p={2}>
            <Typography variant="subtitle1" mb={2}>
              Upcoming Tasks
            </Typography>
          </Box>
          <AppliedFilters />
          <Box display="flex" gap={3} alignItems="center" justifyContent="center">
            <div style={{ display: "flex", gap: "10px", alignItems: "center", justifyContent: "center" }}>
              <SearchContainer
                minWidth="400px"
                value={search}
                debounced
                placeHolder="Search"
                onChange={(v) => dispatch(handleSearch(v))}
              />
              <Button
                size="medium"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={() => setOpenFilters(true)}
                color="primary"
                sx={{ border: "1px solid lightgrey", borderRadius: "4px", marginRight: "40px" }}
              >
                Filter
              </Button>
            </div>
          </Box>
        </Box>
        <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} />
      </>
      <Table
        sx={{ margin: "20px" }}
        loading={isLoading}
        onRowClick={(v) => navigate(`/task-board/${v?.id}/?clientId=${v?.client?.clientId}`)}
        data={pendingTasks || []}
        columns={[
          {
            key: "sno",
            title: "S.No",
          },
          { key: "client.displayName", title: "Client Name", width: "200px" },
          { key: "name", title: "Task Name", width: "200px" },
          {
            key: "frequency",
            title: "Frequency",
          },
          {
            key: "period",
            title: "Period",
            render: (item: any) => item?.financialYear
          },
          {
            key: "priority",
            title: "Priority",
          },
          {
            key: "task_start_date",
            title: "Start Date",
            render: (item: any) => moment(item?.taskStartDate).format("DD-MM-YYYY"),
          },
          {
            key: "due_date",
            title: "Due Date",
            render: (item: any) => moment(item?.dueDate).format("DD-MM-YYYY"),
          },
          {
            key: "Memberss",
            title: "Members",
            render: (v) => (
              <Members
                data={v?.members?.map((item: any) => ({
                  title: item?.fullName,
                  src: item?.imageUrl,
                }))}
              />
            ),
          },
        ]}
      />
    </Box>
  );
}

export default UpcomingTasks;