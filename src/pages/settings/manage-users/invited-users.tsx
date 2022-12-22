import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { cancelInvitation, getInvitedusers, resendInvitation } from "api/services/users";
import Loader from "components/Loader";
import Table from "components/Table";
import { snack } from "components/toast";
import { useMenu } from "context/MenuPopover";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { handleError } from "utils/handleError";

const InvitedUsers = () => {
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const { data, isLoading }: ResType = useQuery(
    ["invited-users", { offset: page * pageCount, limit: pageCount }],
    getInvitedusers
  );

  const totalCount = data?.data?.totalCount || 0;

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Typography mb={2} variant="subtitle1">
        Invited Users
      </Typography>
      <Table
        columns={column}
        loading={isLoading}
        data={data?.data?.result?.map((item: any, index: number) => {
          return { ...item, number: page > 0 ? page * 10 + (index + 1) : index + 1 };
        })}
        pagination={{ totalCount, page, setPage, pageCount, setPageCount }}
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
  {
    key: "status",
    title: "Status",
    render: (row: any) => {
      let status = row?.status;
      let color = status === "PENDING" ? "#149ECD" : status === "CANCELLED" ? "#F2353C" : "#8BC34A";
      return (
        <Typography sx={{ fontSize: 15 }} variant="subtitle2" color={color}>
          {status}
        </Typography>
      );
    },
  },
  {
    key: "",
    title: "Action",
    render: (row: any) => (row?.status === "PENDING" ? <Actions data={row} /> : null),
  },
];

const Actions = ({ data }: any) => {
  const menu = useMenu();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(cancelInvitation, {
    onSuccess: () => {
      snack.success("Invitation cancelled successfully");
      queryClient.invalidateQueries("invited-users");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { mutate: resend } = useMutation(resendInvitation, {
    onSuccess: () => {
      snack.success("Reminder Invitation has been successfully");
      queryClient.invalidateQueries("invited-users");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    menu({
      target: event.currentTarget,
      position: "bottom-right",
      options: [
        {
          label: "Cancel Invitation",
          action: () => mutate(data.id),
        },
        {
          label: "Resend Invitation",
          action: () => resend(data.id),
        },
      ],
    });
  };

  return (
    <IconButton onClick={handleMenu}>
      <MoreVert />
    </IconButton>
  );
};
