import { Box, Typography } from "@mui/material";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import Table, { ColumnType } from "components/Table";
import moment from "moment";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { getTitle } from "utils";
import { formattedDatetime } from "utils/formattedDateTime";

type Props = {
  data: any;
};

const getApprovalUpdate = (approvals: any[]) => {
  const sorted = _.sortBy(approvals, "level");
  const lastApprovedIndex = _.findLastIndex(sorted, { status: "APPROVED" });
  const allApproved = _.every(sorted, { status: "APPROVED" });

  if (allApproved) return `All approvals have been approved`;

  return `Level ${lastApprovedIndex + 1} has been approved`;
};

const getLastApprovedDate = (approvals: any[]) => {
  const sorted = _.sortBy(approvals, "level");
  const lastApprovedIndex = _.findLastIndex(sorted, { status: "APPROVED" });

  return formattedDatetime(sorted[lastApprovedIndex]?.updatedAt);
};
function TaskTable({ data }: Props) {
  const navigate = useNavigate();
  return (
    <Table
      sx={{ mt: 3 }}
      loading={false}
      onRowClick={(v) => navigate(`/task-board/${v?.id}/?clientId=${v?.client?.clientId}`)}
      data={data || []}
      columns={columns}
    />
  );
}

const columns: Array<ColumnType> = [
  { key: "taskNumber", title: "TaskId" },
  { key: "name", title: "Task Name" },
  {
    key: "dueDate",
    title: "Due Date",
    width: "200px",
    render: (row) => {
      return row?.dueDate ? moment(row?.dueDate).format("DD-MM-YYYY") : "";
    },
  },
  { key: "client.displayName", title: "Client Name" },
  {
    key: "priority",
    title: "Priority",
    render: (v) => <PriorityText text={v?.priority} />,
  },
  {
    key: "Approval Levels",
    title: "Approval Level",
    render: (row) => {
      return row?.approvals?.length > 0 ? (
        <Box>
          {_.some(row?.approvals, { status: "APPROVED" }) ? (
            <>
              <Typography variant="body2">{getApprovalUpdate(row?.approvals)}</Typography>
              <Typography variant="caption" color="rgba(0,0,0,0.5)">
                Last Updated on {getLastApprovedDate(row?.approvals)}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" textAlign="center">
              Approval Levels ({row?.approvals.length})
            </Typography>
          )}
        </Box>
      ) : null;
    },
  },
  {
    key: "status",
    title: "Status",
    render: (v) => {
      return <Typography variant="body2">{getTitle(v?.status)}</Typography>;
    },
  },
  {
    key: "Memberss",
    title: "Members",
    render: (v) => (
      <Members
        data={v?.members?.map((item: any) => ({
          title: item?.fullName,
          src: item?.imageUrl,
        }))}
      />
    ),
  },
];

export default TaskTable;
