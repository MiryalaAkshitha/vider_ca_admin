import Members from "components/Members";
import Table, { ColumnType } from "components/Table";
import { useNavigate } from "react-router-dom";

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
  { key: "taskId", title: "taskId" },
  { key: "name", title: "Task Name" },
  { key: "dueDate", title: "Due Date" },
  { key: "client.displayName", title: "Client Name" },
  { key: "priority", title: "Priority" },
  { key: "status", title: "Email" },
  {
    key: "Memberss",
    title: "Members",
    render: (v) => (
      <Members
        data={v?.members?.map((item: any) => ({ title: item?.firstName }))}
      />
    ),
  },
];

export default TaskTable;
