import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { terminateRecurringProfile } from "api/services/recurring";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getTitle } from "utils";
import { RecurringFrequency } from "utils/constants";
import { StyledRecurProfileItem } from "../styles";
import EditRecurringProfile from "./EditRecurringProfile";
import ViewRecurringProfile from "./ViewRecurringProfile";

interface Props {
  active?: boolean;
  last?: boolean;
  data?: any;
  onClick: () => void;
}

const RecurringProfileItem = ({ active, last, data, onClick }: Props) => {
  const menu = useMenu();
  const snack = useSnack();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const { mutate } = useMutation(terminateRecurringProfile, {
    onSuccess: (res) => {
      snack.success("Recurring profile terminate");
      setOpen(false);
      queryClient.invalidateQueries("recurring-profiles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleTerminate = () => {
    confirm({
      msg: "Are you sure you want to terminate this recurring profile?",
      action: () => {
        mutate({
          id: data.id,
        });
      },
    });
  };

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let options = [
      {
        label: "Edit",
        action: () => setOpen(true),
      },
      {
        label: "Terminate",
        action: handleTerminate,
      },
    ];

    if (
      data?.status === "completed" ||
      data?.status === "terminated" ||
      data?.frequency === RecurringFrequency.CUSTOM
    ) {
      options = [
        {
          label: "View",
          action: () => setViewOpen(true),
        },
      ];
    }

    menu({
      target: e.currentTarget,
      options,
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
            {data?.name} - {getTitle(data?.frequency)}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Created by {data?.user?.fullName}
          </Typography>
          <Typography
            variant="caption"
            sx={{ display: "block" }}
            gutterBottom
            color="rgba(0,0,0,0.6)"
          >
            on {moment(data?.createdAt).format("MMM DD, YYYY, hh:mm a")}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.8)">
            Status - {getTitle(data?.status)}
          </Typography>
        </Box>
        <div>
          <IconButton onClick={handleMenu}>
            <MoreVert />
          </IconButton>
        </div>
      </StyledRecurProfileItem>
      <EditRecurringProfile data={data} open={open} setOpen={setOpen} />
      <ViewRecurringProfile data={data} open={viewOpen} setOpen={setViewOpen} />
    </>
  );
};

export default RecurringProfileItem;
