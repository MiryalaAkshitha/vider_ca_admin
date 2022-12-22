import { Box, Button, Paper, Typography } from "@mui/material";
import { exportLogHoursReport } from "api/services/reports";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation } from "react-query";
import { formattedDate } from "utils/formattedDate";
import { handleError } from "utils/handleError";

function Report({ data, state, isLoading, isError }) {
  const { mutate } = useMutation(exportLogHoursReport, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const file = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = file;
      link.download = "LogHours.xlsx";
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
            Total number of hours: {data?.totalLogHours}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="secondary" onClick={handleExport}>
            Export to Excel
          </Button>
        </Box>
      </Box>
      <Table loading={false} data={data?.result || []} columns={columns} />
    </Paper>
  );
}

const columns = [
  {
    title: "Date",
    key: "completedDate",
    render: (row: any) => {
      return formattedDate(row?.completedDate);
    },
  },
  {
    title: "Client",
    key: "client.displayName",
  },
  {
    title: "Task Name",
    key: "task.name",
  },
  {
    title: "Employee",
    key: "user.fullName",
  },
  {
    title: "Log Hours",
    key: "duration",
    render: (row: any) => {
      return moment.utc(+row?.duration).format("HH:mm");
    },
  },
  {
    title: "Log Hour Type",
    key: "type",
  },
];

export default Report;
