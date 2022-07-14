import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { updateApproval } from "api/services/approval-heirarchy";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { formattedDatetime } from "utils/formattedDateTime";
import { handleError } from "utils/handleError";

interface Props {
  item: any;
  index: number;
  queryKey?: string;
}

function ApprovalLevel(props: Props) {
  const { item, index, queryKey = "task-approvals" } = props;
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    setStatus(item?.status);
    setNewStatus(item?.status);
  }, [item]);

  const { mutate } = useMutation(updateApproval, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      snack.success("Updated successfully");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleUpdate = () => {
    mutate({
      approvalId: item.id,
      status: newStatus,
      remarks,
    });
  };

  return (
    <TimelineItem
      sx={{
        "&:before": {
          display: "none",
        },
      }}
    >
      <TimelineSeparator>
        <TimelineDot
          variant="outlined"
          sx={{
            background: item?.status === "APPROVED" ? "#89B152" : "white",
            ...(item?.status === "APPROVED" && {
              border: "2px solid transparent",
            }),
          }}
        >
          <CheckRoundedIcon
            sx={{
              ...(item?.status === "APPROVED" && {
                color: "white",
              }),
            }}
          />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ pb: 5 }}>
        <Box
          sx={{
            background: "#f5f5f5",
            borderRadius: "5px",
            padding: "10px",
            width: "50%",
          }}
        >
          <Typography variant="subtitle2">
            Approval Level {index + 1}
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            border: "1px solid #22222229",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1,
              borderBottom: "1px solid #22222229",
            }}
          >
            <Typography variant="h6">Reviewer Details</Typography>
          </Box>
          <Box p={2}>
            <Box display="flex" gap={1}>
              <Box flex={1} display="flex" gap={1} alignItems="center">
                <Avatar src={item?.user?.imageUrl} />
                <Box>
                  <Typography variant="body1">
                    {item?.user?.fullName}
                  </Typography>
                  <Typography variant="caption" color="rgba(0,0,0,0.5)">
                    {item?.role?.name}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <TextField
                  sx={{ width: 150 }}
                  label="Status"
                  variant="outlined"
                  size="small"
                  select
                  fullWidth
                  onChange={(e) => setNewStatus(e.target.value)}
                  value={newStatus}
                >
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="APPROVED">Approved</MenuItem>
                </TextField>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="caption" color="rgba(0,0,0,0.5)">
                Last updated on:
              </Typography>
              <Typography variant="body2">
                {formattedDatetime(item?.updatedAt)}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="caption" color="rgba(0,0,0,0.5)">
                Remarks:
              </Typography>
              <Typography variant="body2">
                {item?.remarks || "No remarks"}
              </Typography>
            </Box>
            {newStatus !== status && (
              <Box maxWidth={500} mt={3}>
                <TextField
                  placeholder="Remarks"
                  fullWidth
                  multiline
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  variant="outlined"
                />
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                >
                  Update Changes
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
}

export default ApprovalLevel;
