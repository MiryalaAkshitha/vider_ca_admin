import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { getRoles } from "api/services/roles";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  addApprovalLevel,
  selectApprovals,
} from "redux/reducers/approvalsSlice";
import ApprovalLevel from "./ApprovalLevel";

function ApprovalLevels() {
  const dispatch = useDispatch();
  const { approvalLevels } = useSelector(selectApprovals);

  const { data, isLoading } = useQuery("roles", getRoles);

  const { data: users, isLoading: usersLoading } = useQuery("users", getUsers);

  if (isLoading || usersLoading) return <Loader />;

  return (
    <Box mt={3}>
      <Box mb={2} display="flex" gap="4px">
        <Typography variant="body2">Approval Levels</Typography>
        <Typography variant="caption">
          (Lower levels will do the review first and higher levels will finalize
          the review)
        </Typography>
      </Box>
      {approvalLevels.map((approvalLevel, index) => (
        <ApprovalLevel
          users={users?.data}
          roles={data?.data}
          data={approvalLevel}
          index={index}
          key={index}
        />
      ))}

      <Box
        textAlign="right"
        mt={2}
        onClick={() => dispatch(addApprovalLevel())}
      >
        <Button sx={{ mb: 5 }} color="secondary" startIcon={<Add />}>
          Add Approval Level
        </Button>
      </Box>
    </Box>
  );
}

export default ApprovalLevels;
