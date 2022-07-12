import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import {
  createApprovalHeirarchy,
  getApprvalHeirarchyDetails,
  updateAppHierarchy,
} from "api/services/approval-heirarchy";
import Loader from "components/Loader";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleApprovalName,
  handleApprovalType,
  resetData,
  selectApprovals,
  setData,
} from "redux/reducers/approvalsSlice";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import ApprovalLevels from "views/settings/approval-hierarchies/ApprovalLevels";

function AddApprovalHierarchy() {
  const queryClient = useQueryClient();
  const { name, type, approvalLevels } = useSelector(selectApprovals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();
  const approvalId = queryParams.approvalId;

  useEffect(() => {
    if (!approvalId) {
      dispatch(resetData());
    }
  }, [approvalId, dispatch]);

  const { isLoading }: ResType = useQuery(
    ["approval-details", approvalId],
    getApprvalHeirarchyDetails,
    {
      onSuccess: (res: any) => {
        dispatch(setData(res?.data));
      },
      enabled: !!approvalId,
    }
  );

  const { mutate } = useMutation(createApprovalHeirarchy, {
    onSuccess: () => {
      queryClient.invalidateQueries("approval-heirarchies");
      navigate("/settings/approvals");
    },
    onError: (error: any) => {
      snack.error(handleError(error));
    },
  });

  const { mutate: update } = useMutation(updateAppHierarchy, {
    onSuccess: () => {
      queryClient.invalidateQueries("approval-heirarchies");
      navigate("/settings/approvals");
    },
    onError: (error: any) => {
      snack.error(handleError(error));
    },
  });

  const handleSubmit = () => {
    if (approvalId) {
      update({
        id: approvalId,
        data: {
          name,
          type,
          approvalLevels,
        },
      });
    } else {
      mutate({
        name,
        type,
        approvalLevels,
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 5,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1">
          {approvalId ? "Update" : "Add"} Approval Hierarchy
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            onClick={() => navigate("/settings/approvals")}
            sx={{ minWidth: 130 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{ minWidth: 130 }}
            disableElevation
            variant="contained"
            color="secondary"
          >
            Save
          </Button>
        </Box>
      </Box>
      <Box sx={{ maxWidth: 600 }}>
        <TextField
          label="Approval Hierarchy Name"
          variant="outlined"
          size="small"
          fullWidth
          value={name}
          onChange={(e) => dispatch(handleApprovalName(e.target.value))}
        />
        <TextField
          sx={{ mt: 2 }}
          label="Approval Hierarchy Type"
          variant="outlined"
          size="small"
          select
          fullWidth
          value={type}
          onChange={(e) => dispatch(handleApprovalType(e.target.value))}
        >
          <MenuItem value="SERVICE">Service</MenuItem>
          <MenuItem value="TASK">Task</MenuItem>
          <MenuItem value="IPRO">I-Pro</MenuItem>
        </TextField>
        <ApprovalLevels />
      </Box>
    </>
  );
}

export default AddApprovalHierarchy;
