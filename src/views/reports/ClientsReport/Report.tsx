import { Box, Button, Paper, Typography } from "@mui/material";
import { exportClientsReport, exportEmployeeLogHoursReport } from "api/services/reports";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import moment from "moment";
import { useMutation } from "react-query";
import { getTitle } from "utils";
import { handleError } from "utils/handleError";

function Report({ data, state, isLoading, isError }) {
  const { mutate } = useMutation(exportClientsReport, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const file = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = file;
      link.download = "Clients.xlsx";
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
            Total number of Clients: {data?.length}
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

const columns = [
  {
    title: "Client Id",
    key: "clientId",
  },
  { key: "tradeName", title: "Trade Name" },
  {
    title: "Client",
    key: "displayName",
  },
  {
    title: "Email",
    key: "email",
  },
  { key: "mobileNumber", title: "Mobile Number" },
  {
    title: "Category",
    key: "category",
    render: (row: any) => getTitle(row?.category),
  },
  {
    title: "Sub Category",
    key: "subCategory",
    render: (row: any) => getTitle(row?.subCategory),
  },
  {
    key: "active",
    title: "Status",
    default: true,
    render: (rowData) => {
      return (
        <div>
          {rowData?.active ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          )}
        </div>
      );
    },
  },
];

export default Report;
