import { Box, Button, Paper, Typography } from "@mui/material";
import {
  exportClientsReport,
  exportEmployeeLogHoursReport,
  exportTasksReport,
} from "api/services/reports";
import Loader from "components/Loader";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation } from "react-query";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import { handleError } from "utils/handleError";

function Report({ data, state, isLoading, isError }) {
  const { mutate } = useMutation(exportTasksReport, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const file = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = file;
      link.download = "Tasks.xlsx";
      link.click();
      snack.success("Exported successfully");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleExport = () => {
    mutate({
      ...state,
      fromDate: state.fromDate ? moment(state.fromDate).format("YYYY-MM-DD") : null,
      toDate: state.toDate ? moment(state.toDate).format("YYYY-MM-DD") : null,
    });
  };

  if (isLoading) return <Loader />;

  if (isError) return null;

  if (!data) return null;

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
        <Box>
          <Typography variant="subtitle2" color="primary">
            Total number of Tasks: {data?.length}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="secondary" onClick={handleExport}>
            Export to Excel
          </Button>
        </Box>
      </Box>
      <Table loading={false} data={data || []} columns={columns} />
    </Paper>
  );
}

const columns: Array<ColumnType> = [
  { key: "taskNumber", title: "Task Id" },
  { key: "name", title: "Task Name", width: "200px" },
  { key: "dueDate", title: "Due Date", render:(row :any) => formattedDate(row.dueDate) },
  { key: "client.displayName", title: "Client Name", width: "200px" },
  { key: "category.name", title: "Category" },
  { key: "subCategory.name", title: "Sub Category" },
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

export default Report;
