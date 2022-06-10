import { Box } from "@mui/material";
import { getDeletedTasks } from "api/services/client";
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

function DeletedTasks({ filters }: Props) {
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    [
      "deleted-tasks",
      {
        clientId: params?.clientId,
      },
    ],
    getDeletedTasks
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
              title: "Task name",
            },
            {
              key: "deletedDate",
              title: "Deleted Date",
              render: (row) => {
                return row?.deletedDate
                  ? moment(row?.deletedDate).format("MM/DD/YYYY, h:mm a")
                  : "";
              },
            },
            {
              key: "paymentStatus",
              title: "Payment status",
              render: (row) => getTitle(row?.paymentStatus),
            },
            {
              key: "Memberss",
              title: "Members",
              render: (v) => (
                <Members
                  data={v?.members?.map((item: any) => ({
                    title: item?.fullName,
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

export default DeletedTasks;
