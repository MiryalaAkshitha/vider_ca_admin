import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { updateTask } from "api/services/tasks/tasks";
import { snack } from "components/toast";
import { useMenu } from "context/MenuPopover";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SubmitType } from "types";
import { getTitle } from "utils";
import { StyledRecurProfileItem } from "views/clients/styles";

interface Props {
  active?: boolean;
  last?: boolean;
  data?: any;
  onClick: () => void;
}

const RecurringProfileItem = ({ active, last, data, onClick }: Props) => {
  const queryClient = useQueryClient();
  const menu = useMenu();
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    if (data?.tasks && data?.tasks.length > 0) {
      const isPending = data?.tasks?.filter((task: any) => task.recurringStatus == 'pending');
      if (isPending.length > 0) {
        setOpenMenu(true);
      } else {
        setOpenMenu(false);
      }
    }
  }, [data]);

  const { mutate } = useMutation(updateTask, {
    onSuccess: (res) => {
      snack.success("Pending Recurring tasks has been Terminated");
      queryClient.invalidateQueries("recurring-profiles");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();

    data?.tasks?.map((task: any) => {
      setTimeout((tsk) => {
        const terminateData = JSON.parse(JSON.stringify(tsk));
        if (terminateData.recurringStatus == 'pending' || terminateData.recurringStatus == 'terminated') {
          terminateData.status = 'terminated';
          terminateData.recurringStatus = 'terminated';

          mutate({
            id: terminateData.id,
            data: { ...terminateData },
          });
        }
      }, 500, task);
    });
  };

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Terminate",
          action: () => handleSubmit(e),
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
            {data?.name} - {getTitle(data?.frequency)}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Financial year: {data?.financialYear}
          </Typography>
          <Typography variant="body2" gutterBottom color="rgba(0,0,0,0.6)">
            Frequency: {getTitle(data?.frequency)}
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

        </Box>
        {openMenu && (
          <Box>
            <IconButton onClick={handleMenu}>
              <MoreVert />
            </IconButton>
          </Box>
        )}
      </StyledRecurProfileItem>
    </>
  );
};

export default RecurringProfileItem;
