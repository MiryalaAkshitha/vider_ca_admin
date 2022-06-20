import { MoreVert } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteContactPerson } from "api/services/client";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledContactPerson } from "views/clients/clients/styles";
import EditContactPerson from "./EditContactPerson";

type Props = {
  data: any;
};

function ContactPerson({ data }: Props) {
  const confirm = useConfirm();
  const menu = useMenu();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useMutation(deleteContactPerson, {
    onSuccess: () => {
      snack.success("Contact Person Deleted");
      setOpen(false);
      queryClient.invalidateQueries("client");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleRemove = () => {
    confirm({
      msg: "Are you sure you want to delete this contact person?",
      action: () => {
        mutate(data?.id);
      },
    });
  };

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: event.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: handleRemove,
        },
      ],
    });
  };

  return (
    <StyledContactPerson>
      <Box flex={1} display="flex" gap={1}>
        <div>
          <AccountCircleRoundedIcon color="disabled" sx={{ fontSize: 50 }} />
        </div>
        <div>
          <Typography variant="body2">{data?.name}</Typography>
          <Typography variant="caption" color="rgba(0,0,0,0.7)">
            {data?.role}
          </Typography>
        </div>
      </Box>
      <Box>
        <Typography style={{ color: "#149ECD" }} variant="body2">
          {data?.mobile}
        </Typography>
        <Typography style={{ color: "#149ECD" }} variant="body2">
          {data?.email}
        </Typography>
      </Box>
      <Box position="absolute" right={5} top={5}>
        <IconButton onClick={handleMenu}>
          <MoreVert />
        </IconButton>
      </Box>
      <EditContactPerson open={open} data={data} setOpen={setOpen} />
    </StyledContactPerson>
  );
}

export default ContactPerson;
