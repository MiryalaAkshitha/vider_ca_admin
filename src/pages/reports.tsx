import { Box } from "@mui/system";
import ComingSoon from "components/ComingSoon";
import useTitle from "hooks/useTitle";

function Reports() {
  useTitle("Reports");

  return (
    <Box p={2}>
      <ComingSoon title="Reports" />
    </Box>
  );
}

export default Reports;
