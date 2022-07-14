import { getUserTasks } from "api/services/tasks";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle, getTotalLogHoursDuration } from "utils";
import { formattedDatetime } from "utils/formattedDateTime";

function Tasks() {
  const params = useParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading }: ResType = useQuery(
    ["tasks", { userId: params.userId, search }],
    getUserTasks
  );

  return (
    <>
      <SearchContainer
        value={search}
        onChange={setSearch}
        debounced
        placeHolder="Search by task/client/category name"
      />
      <Table
        onRowClick={(row) => navigate(`/task-board/${row.id}#details`)}
        sx={{ mt: 2 }}
        data={data?.data || []}
        loading={isLoading}
        columns={[
          {
            title: "Task ID",
            key: "taskNumber",
          },
          {
            title: "Task Name",
            key: "name",
          },
          {
            title: "Created On",
            key: "createdAt",
            render: (row) => formattedDatetime(row.createdAt),
          },
          {
            title: "Client Name",
            key: "client.displayName",
          },
          {
            title: "Category Name",
            key: "category.name",
          },
          {
            title: "Task Type",
            key: "",
            render: (row) => (row?.recurring ? "Recurring" : "Non-recurring"),
          },
          {
            title: "Status",
            key: "status",
            render: (row) => getTitle(row.status),
          },
          {
            title: "Due Date",
            key: "dueDate",
          },
          {
            title: "Priority",
            key: "priority",
          },
          {
            title: "Log Hours",
            key: "",
            render: (row) => {
              return getTotalLogHoursDuration(row.taskLogHours || []);
            },
          },
        ]}
      />
    </>
  );
}

export default Tasks;
