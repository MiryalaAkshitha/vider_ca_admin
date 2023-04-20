import { Box } from "@mui/material";
import { getCompletedTasks } from "api/services/clients/clients";
import Members from "components/Members";
import Table from "components/Table";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";

interface Props {
  filters: {
    financialYear: string;
    search: string;
  };
}

function CompletedTasks({ filters }: Props) {
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    [
      "completed-tasks",
      {
        clientId: params?.clientId,
      },
    ],
    getCompletedTasks
  );

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

  return (
    <>
      <Box mt={4}>
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
                return row?.updatedAt
                  ? moment(row?.updatedAt).format("DD-MM-YYYY")
                  : "";
              },
            },
            {
              key: "paymentStatus",
              title: "Billing Status",
              render: (row) => getTitle(row?.paymentStatus),
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
    </>
  );
}

export default CompletedTasks;
