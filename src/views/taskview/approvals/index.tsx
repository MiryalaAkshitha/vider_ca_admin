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
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import SelectApprovalHierarchy from "views/tasks/board/CreateTask/SelectApprovalHierarchy";
import ApprovalLevel from "./ApprovalLevel";

function Approvals() {
  const queryClient = useQueryClient();
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

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

  const { data, isLoading }: ResType = useQuery(
    ["task-approvals", { taskId: params.taskId, type: "TASK" }],
    getApprovals
  );

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
            {data?.data?.map((item: any, index: number) => (
              <ApprovalLevel item={item} index={index} key={index} />
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
