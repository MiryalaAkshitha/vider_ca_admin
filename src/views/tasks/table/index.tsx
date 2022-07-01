import { Typography } from "@mui/material";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import { useNavigate } from "react-router-dom";
import { getTitle } from "utils";

type Props = {
  data: any;
};

function TaskTable({ data }: Props) {
  const navigate = useNavigate();
  return (
    <Table
      sx={{ mt: 3 }}
      loading={false}
      onRowClick={(v) =>
        navigate(`/task-board/${v?.id}/?clientId=${v?.client?.clientId}`)
      }
      data={data || []}
      columns={columns}
    />
  );
}

const columns: Array<ColumnType> = [
  { key: "taskNumber", title: "taskId" },
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

export default TaskTable;
