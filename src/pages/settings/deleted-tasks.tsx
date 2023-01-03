import { Button, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { getDeletedTasks } from "api/services/clients/clients";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import moment from "moment";
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
  { key: "client.displayName", title: "Client Name" },
  { key: "name", title: "Task Name" },
  { key: "dueDate", title: "Due Date" },
  { key: "deletedDate", title: "Deleted Date",
  render:(v)=>moment(v.deletedDate).format("YYYY-MM-DD")
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
        >
          Restore
        </Button>
      );
    },
  },
];

export default DeletedTasks;
