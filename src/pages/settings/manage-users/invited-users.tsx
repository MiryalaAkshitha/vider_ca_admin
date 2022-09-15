import { Box, Typography } from "@mui/material";
import { getInvitedusers } from "api/services/users";
import Loader from "components/Loader";
import Table from "components/Table";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
// import ColumnGroupingTable from "./inviteTable";

const InvitedUsers = () => {
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const { data, isLoading }: ResType = useQuery("invited-users", getInvitedusers);

  const totalCount = data?.data.length;

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Typography mb={2} variant="subtitle1">
        Invited Users
      </Typography>
      <Table
        sx={{ mt: 3 }}
        columns={column}
        loading={isLoading}
        data={data?.data.map((item: any, index: number) => {
          return { ...item, number: index + 1 };
        })}
        // pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
      />
    </Box>
  );
};

export default InvitedUsers;

const column = [
  {
    key: "number",
    title: "SNo",
    minWidth: 20,
  },
  { key: "fullName", title: "Name", minWidth: 20 },
  { key: "mobileNumber", title: "Mobile Number", minWidth: 20 },
  { key: "email", title: "Email", minWidth: 20 },
];
