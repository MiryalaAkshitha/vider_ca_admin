import { Box, Button, Paper, Typography } from "@mui/material";
import { exportCommonReport } from "api/services/reports";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import { REPORT } from "data/constants";
import moment from "moment";
import { useMutation } from "react-query";
import { getTitle } from "utils";
import { handleError } from "utils/handleError";

function Report({ data, state, isLoading, isError, payload }) {
  const columns: any = [];

  const { mutate } = useMutation(exportCommonReport, {

    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const file = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = file;
      link.download = JSON.parse(res?.config?.data).query + ".xlsx";
      link.click();
      snack.success("Exported successfully");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleExport = () => {
    const updatedstate = Object.assign({}, state, payload );
    mutate({
      ...updatedstate
    });
  };

  if (isLoading) return <Loader />;

  if (isError) return null;

  if (!data) return null;

  if (data && data.length > 0) {
    for (const [key, value] of Object.entries(data[0])) {
      columns.push({ key: `${key}`, title: REPORT[key] });
    }
  }

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
        {/* <Box>
          <Typography variant="subtitle2" color="primary">
            {state.title} is  {data?.length}
          </Typography>
        </Box> */}
        <Box>
          <Button variant="outlined" color="secondary" onClick={handleExport}>
            Export to Excel
          </Button>
        </Box>
      </Box>
      {columns?.length > 0 &&
        <Table loading={false} data={data || []} columns={columns} />
      }
    </Paper>
  );
}

export default Report;
