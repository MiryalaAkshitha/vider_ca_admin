import { Box } from "@mui/system";
import ComingSoon from "components/ComingSoon";
import useTitle from "hooks/useTitle";

function BroadCast() {
  useTitle("Broadcast");

  return (
    <Box p={2}>
      <ComingSoon title="Broadcast" />
    </Box>
  );
}

export default BroadCast;
