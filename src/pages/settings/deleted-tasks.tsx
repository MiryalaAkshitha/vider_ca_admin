import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { getDeletedTasks, restoreTask } from "api/services/clients/clients";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { handleError } from "utils/handleError";
import { useConfirm } from "context/ConfirmDialog";

function DeletedTasks() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const { data, isLoading }: ResType = useQuery(["deleted-tasks"], getDeletedTasks);

  const { mutate } = useMutation(restoreTask, {
    onSuccess: () => {
      snack.success("Task restored successfully");
      queryClient.invalidateQueries("deleted-tasks");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleRestore = (id: any) => {
    confirm({
      msg: "Are you sure you want to restore this Task?",
      action: () => mutate(id),
    });
  };

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
    {
      key: "Action",
      title: "Action",
      render: (item: any) => {
        return (
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => handleRestore(item?.id)}
          >
            Restore
          </Button>
        );
      },
    },
  ];

  return (
    <Box p={2}>
      <Typography variant="subtitle1" mb={2}>
        Deleted Tasks
      </Typography>
      <Table loading={isLoading} data={data?.data || []} columns={columns || []} />
    </Box>
  );
}



export default DeletedTasks;

