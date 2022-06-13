import { Box, Typography } from "@mui/material";
import { getInvitedusers } from "api/services/users";
import Loader from "components/Loader";
import Table from "components/Table";
import { useQuery } from "react-query";
import { ResType } from "types";

const InvitedUsers = () => {
  const { data, isLoading }: ResType = useQuery("users", getInvitedusers);

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Typography gutterBottom variant="subtitle2">
        Invited Users
      </Typography>
      <Table data={data?.data || []} columns={columns} loading={false} />
    </Box>
  );
};

export default InvitedUsers;

const columns = [
  {
    key: "id",
    title: "Id",
  },
  {
    key: "fullName",
    title: "Name",
  },
  {
    key: "mobileNumber",
    title: "Mobile Number",
  },
  {
    key: "email",
    title: "Email",
  },
];
