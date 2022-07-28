import { Timeline } from "@mui/lab";
import { Box, Button } from "@mui/material";
import {
  getApprovals,
  updateEstimateApprovals,
} from "api/services/approval-heirarchy";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { usePermissions } from "context/PermissionsProvider";
import { useUserData } from "context/UserProfile";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { handleError } from "utils/handleError";
import SelectApprovalHierarchy from "views/tasks/board/CreateTask/SelectApprovalHierarchy";
import ApprovalLevel from "views/taskview/approvals/ApprovalLevel";

interface IProps extends DialogProps {
  estimateId: number;
}

function ViewApprovalStatus({ open, setOpen, estimateId }: IProps) {
  const queryClient = useQueryClient();
  const { role } = usePermissions();
  const { data: user } = useUserData();
  const [openAppHier, setOpenAppHier] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["estimate-approvals", { type: "ESTIMATE", estimateId }],
    getApprovals,
    {
      enabled: Boolean(estimateId) && open,
    }
  );

  const { mutate } = useMutation(updateEstimateApprovals, {
    onSuccess: () => {
      queryClient.invalidateQueries("estimate-approvals");
      snack.success("Approvals updated successfully");
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

  return (
    <DialogWrapper
      title="Approval Status"
      open={open}
      setOpen={() => {
        setOpen(false);
        queryClient.invalidateQueries("estimates");
      }}
      width="lg"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Box textAlign="right">
            <Button onClick={() => setOpenAppHier(true)} color="secondary">
              Update Approval Hierarchy
            </Button>
          </Box>
          <Timeline>
            {_.sortBy(data?.data, "level")?.map((item: any, index: number) => (
              <ApprovalLevel
                enabled={shouldBeEnabled(index) && hasPermission(item)}
                item={item}
                index={index}
                key={index}
                queryKey="estimate-approvals"
              />
            ))}
          </Timeline>
        </Box>
      )}
      <SelectApprovalHierarchy
        open={openAppHier}
        setOpen={setOpenAppHier}
        onChange={(data) => {
          mutate({
            approvalHierarchyId: data?.id,
            estimateId,
          });
        }}
      />
    </DialogWrapper>
  );
}

export default ViewApprovalStatus;
