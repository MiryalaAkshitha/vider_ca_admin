import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getLogHours } from "api/services/tasks";
import { noSubTasks } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import moment from "moment";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import { TaskStatus } from "utils/constants";
import { StyledTimline } from "views/taskboard/styles";
import AddLogHour from "./AddLogHour";
import LogHoursList from "./LogHoursList";
import LogHoursTopbar from "./LogHoursTopbar";

function LogHours() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data, isLoading }: ResType = useQuery(
    ["loghours", params.taskId],
    getLogHours
  );

  const handleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const totalLogHours = data?.data?.logHours?.reduce(
    (acc: number, curr: any) => {
      return acc + +curr.duration;
    },
    0
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box>
        <Typography variant="subtitle1" color="primary">
          Timeline
        </Typography>
        <StyledTimline>
          {Object.values(TaskStatus).map(
            (status: TaskStatus, index: number) => (
              <div key={index}>
                <div>
                  <Typography
                    color={getTimelineStatusColor(status)}
                    variant="h6"
                  >
                    {getTitle(status)}
                  </Typography>
                </div>
                <Typography variant="caption">
                  {data?.data?.timeline[status] &&
                    moment
                      .utc(data?.data?.timeline[status])
                      .local()
                      .format("MM/DD/YYYY, h:mm a")}
                </Typography>
              </div>
            )
          )}
        </StyledTimline>
      </Box>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Log Hours{" "}
          {data?.data?.logHours?.length > 0 &&
            `(${moment.utc(totalLogHours).format("HH:mm")})`}
        </Typography>
        {data?.data?.logHours?.length ? (
          <Button
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            color="secondary"
          >
            Add Log Hour
          </Button>
        ) : null}
      </Box>
      <Box mt={4}>
        {data?.data?.logHours?.length ? (
          <LogHoursList
            selectedItems={selectedItems}
            onSelect={handleSelect}
            data={data?.data?.logHours}
          />
        ) : (
          <NoItems
            img={noSubTasks}
            title="Add log hour in your task"
            desc="Divide your task into smaller items and add them here"
            btnTitle="Add Log Hour"
            btnAction={() => setOpen(true)}
          />
        )}
      </Box>
      <AddLogHour open={open} setOpen={setOpen} />
      <LogHoursTopbar
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </>
  );
}

const getTimelineStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return "#149ECD";
    case TaskStatus.IN_PROGRESS:
      return "#F7964F";
    case TaskStatus.ON_HOLD:
      return "#F2353C";
    case TaskStatus.DONE:
      return "#019335";
    case TaskStatus.UNDER_REVIEW:
      return "#673AB7";
    default:
  }
};

export default LogHours;
