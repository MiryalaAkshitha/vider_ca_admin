import { Box } from "@mui/material";
import { getTerminatedTasks } from "api/services/clients/clients";
import Members from "components/Members";
import Table from "components/Table";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";

interface Props {
  filters: {
    financialYear: string;
    search: string;
  };
}

function TerminatedTasks({ filters }: Props) {
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    [
      "terminated-tasks",
      {
        clientId: params?.clientId,
      },
    ],
    getTerminatedTasks
  );

  const getData = () => {
    let result = data?.data || [];
    if (filters.financialYear) {
      result = result?.filter((item: any) => {
        return item.financialYear === filters.financialYear;
      });
    }
    if (filters.search) {
      result = result?.filter((item) => {
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
              key: "terminatedDate",
              title: "Terminated Date",
              render: (row) => {
                return row?.terminatedDate
                  ? moment(row?.terminatedDate).format("DD-MM-YYYY")
                  : "";
              },
            },
            {
              key: "terminationReason",
              title: "Termination Reason",
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

export default TerminatedTasks;
