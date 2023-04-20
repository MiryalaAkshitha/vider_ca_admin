import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getUserCompletedTasks, restoreClient } from "api/services/clients/clients";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import { getTitle } from "utils";
import Members from "components/Members";

function CompletedTasks() {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const filters = {
    financialYear: '',
    search: ''
  };
  
  const { data, isLoading }: ResType = useQuery(
    [
      "user-completed-tasks",
      {
        userId: 95,
      },
    ],
    getUserCompletedTasks
  );

  const { mutate } = useMutation(restoreClient, {
    onSuccess: () => {
      snack.success("Client restored successfully");
      queryClient.invalidateQueries("deleted-clients");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const getData = () => {
    let result = data?.data || [];
    if (filters.financialYear) {
      result = result?.filter((item: any) => {
        return item.financialYear === filters.financialYear;
      });
    }
    if (filters.search) {
      result = result?.filter((item: any) => {
        return (
          item?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          item?.taskId?.toLowerCase().includes(filters.search.toLowerCase())
        );
      });
    }
    return result;
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Typography variant="subtitle1" mb={2}>
        Completed Tasks
      </Typography>
      <Table
          loading={isLoading}
          data={getData()}
          columns={[
            {
              key: "taskNumber",
              title: "Task ID",
            },
            {
              key: "name",
              title: "Task Name",
            },
            {
              key: "completedDate",
              title: "Completed Date",
              render: (row) => {
                return row?.completedDate
                  ? moment(row?.completedDate).format("DD-MM-YYYY")
                  : "";
              },
            },
            {
              key: "clientid",
              title: "Client Id",
              render: (row) => getTitle(row?.client?.clientId),
            },
            {
              key: "clientname",
              title: "Client Name",
              render: (row) => getTitle(row?.client?.displayName),
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
          ]}
        />
    </Box>
  );
}

export default CompletedTasks;
