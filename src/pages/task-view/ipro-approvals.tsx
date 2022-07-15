import { Timeline } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import {
  getApprovals,
  updateIrpoApprovals,
} from "api/services/approval-heirarchy";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { usePermissions } from "context/PermissionsProvider";
import { useUserData } from "context/UserProfile";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import SelectApprovalHierarchy from "views/tasks/board/CreateTask/SelectApprovalHierarchy";
import ApprovalLevel from "views/taskview/approvals/ApprovalLevel";

function IProApprovals() {
  const { role } = usePermissions();
  const { data: user } = useUserData();
  const queryClient = useQueryClient();
  const params = useParams();
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["ipro-approvals", { iproId: params.formId, type: "IPRO" }],
    getApprovals
  );

  const { mutate } = useMutation(updateIrpoApprovals, {
    onSuccess: () => {
      queryClient.invalidateQueries("ipro-approvals");
      snack.success("Approvals updated successfully");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const hasPermission = (item: any) => {
    if (item?.user) {
      return item.user?.id === user?.id;
    }

    if (item?.role) {
      return item.role?.id === role?.id;
    }

    return false;
  };

  const shouldBeEnabled = (index: number) => {
    const sorted = _.sortBy(data?.data, "level");
    const lastApprovedIndex = _.findLastIndex(sorted, { status: "APPROVED" });

    if (index === lastApprovedIndex + 1) {
      return true;
    }

    return false;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box sx={{ maxWidth: 800, margin: "auto" }}>
        {data?.data?.length ? (
          <Box
            mb={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2">Approvals</Typography>
            <Button color="secondary" onClick={() => setOpen(true)}>
              Update Approval Hierarchy
            </Button>
          </Box>
        ) : null}
        {data?.data?.length ? (
          <Timeline>
            {_.sortBy(data?.data, "level")?.map((item: any, index: number) => (
              <ApprovalLevel
                enabled={shouldBeEnabled(index) && hasPermission(item)}
                item={item}
                index={index}
                key={index}
                queryKey="ipro-approvals"
              />
            ))}
          </Timeline>
        ) : (
          <Box
            onClick={() => setOpen(true)}
            sx={{
              border: "1px dashed lightgrey",
              borderRadius: "5px",
              background: "#F9FAFC",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 150,
              cursor: "pointer",
            }}
          >
            <Typography>Select Approval Hierarchy</Typography>
          </Box>
        )}
      </Box>
      <SelectApprovalHierarchy
        open={open}
        setOpen={setOpen}
        onChange={(v: any) => {
          mutate({
            iproId: params.formId,
            approvalHierarchyId: v.id,
          });
        }}
      />
    </>
  );
}

export default IProApprovals;
