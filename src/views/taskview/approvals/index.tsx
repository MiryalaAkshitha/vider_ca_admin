import { Timeline } from "@mui/lab";
import { Box, Button, Typography } from "@mui/material";
import {
  getApprovals,
  updateTaskApprovals,
} from "api/services/approval-heirarchy";
import { noEvents } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
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
import ApprovalLevel from "./ApprovalLevel";

function Approvals() {
  const { role } = usePermissions();
  const { data: user } = useUserData();
  const queryClient = useQueryClient();
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["task-approvals", { taskId: params.taskId, type: "TASK" }],
    getApprovals
  );

  const { mutate } = useMutation(updateTaskApprovals, {
    onSuccess: () => {
      queryClient.invalidateQueries("task-approvals");
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
      <Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1" color="primary">
          Approvals
        </Typography>
        {data?.data?.length ? (
          <Button onClick={() => setOpen(true)} color="secondary">
            Update Approval Hierarchy
          </Button>
        ) : null}
      </Box>
      {data?.data?.length ? (
        <Box mt={2} sx={{ maxWidth: 800 }}>
          <Timeline>
            {_.sortBy(data?.data, "level")?.map((item: any, index: number) => (
              <ApprovalLevel
                enabled={shouldBeEnabled(index) && hasPermission(item)}
                item={item}
                index={index}
                key={index}
              />
            ))}
          </Timeline>
        </Box>
      ) : (
        <NoItems
          img={noEvents}
          title="Add an Approval Hierarchy in your task"
          desc="Adding approval hierarchy will add approval levels to the task"
          btnTitle="Add Approval Hierarchy"
          btnAction={() => setOpen(true)}
        />
      )}
      <SelectApprovalHierarchy
        open={open}
        setOpen={setOpen}
        onChange={(data: any) => {
          mutate({
            taskId: params.taskId,
            approvalHierarchyId: data.id,
          });
        }}
      />
    </>
  );
}

export default Approvals;
