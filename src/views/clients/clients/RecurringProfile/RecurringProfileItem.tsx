import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import moment from "moment";
import { MouseEvent, useState } from "react";
import { StyledRecurProfileItem } from "../styles";
import EditRecurringProfile from "./EditRecurringProfile";

interface Props {
  active?: boolean;
  last?: boolean;
  data?: any;
  onClick: () => void;
}

const RecurringProfileItem = ({ active, last, data, onClick }: Props) => {
  const menu = useMenu();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this recurring profile?",
      action: () => {
        console.log("delete");
      },
    });
  };

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <>
      <StyledRecurProfileItem
        active={active ? 1 : 0}
        last={last ? 1 : 0}
        onClick={onClick}
      >
        <Box flex={1}>
          <Typography color="primary" variant="subtitle2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Created by {data?.user?.fullName}
          </Typography>
          <Typography variant="caption" gutterBottom color="rgba(0,0,0,0.6)">
            on {moment(data?.createdAt).format("MMM DD, YYYY, hh:mm a")}
          </Typography>
        </Box>
        <div>
          <IconButton onClick={handleMenu}>
            <MoreVert />
          </IconButton>
        </div>
      </StyledRecurProfileItem>
      <EditRecurringProfile data={data} open={open} setOpen={setOpen} />
    </>
  );
};

export default RecurringProfileItem;
