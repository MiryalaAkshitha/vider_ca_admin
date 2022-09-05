import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { getDeletedTasks } from "api/services/clients/clients";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";

function DeletedTasks() {
  const { data, isLoading }: ResType = useQuery(["deleted-tasks"], getDeletedTasks);

  return (
    <Box p={2}>
      <Typography variant="subtitle1" mb={2}>
        Deleted Tasks
      </Typography>
      <Table loading={isLoading} data={data?.data || []} columns={columns || []} />
    </Box>
  );
}

const columns: Array<ColumnType> = [
  { key: "taskNumber", title: "Task Id" },
  { key: "name", title: "Task Name" },
  { key: "dueDate", title: "Due Date" },
  { key: "client.displayName", title: "Client Name" },
  {
    key: "priority",
    title: "Priority",
    render: (v) => <PriorityText text={v?.priority} />,
  },
  {
    key: "status",
    title: "Status",
    render: (v) => {
      return <Typography variant="body2">{getTitle(v?.status)}</Typography>;
    },
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
];

export default DeletedTasks;
