import { MoreVert } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteContactPerson } from "api/services/client";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledContactPerson } from "views/clients/clients/styles";
import EditContactPerson from "./EditContactPerson";

type Props = {
  data: any;
};

function ContactPerson({ data }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    mutate(data?.id);
  };

  return (
    <StyledContactPerson>
      <Box flex={1} display="flex" gap={2} alignItems="center">
        <div>
          <AccountCircleRoundedIcon color="disabled" sx={{ fontSize: 50 }} />
        </div>
        <div>
          <Typography variant="body2">{data?.name}</Typography>
          <Typography variant="caption" color="rgba(0,0,0,0.7)">
            {data?.role}
          </Typography>{" "}
          <br />
          {data?.dscAvailable && (
            <Typography variant="caption" color="rgba(0,0,0,0.7)">
              DSC Available ({data?.dscExpiryDate})
            </Typography>
          )}
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
      <Box>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem onClick={() => setOpen(true)}>
          <Typography variant="body2">Edit</Typography>
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <Typography variant="body2">Remove</Typography>
        </MenuItem>
      </Menu>
      <EditContactPerson open={open} data={data} setOpen={setOpen} />
    </StyledContactPerson>
  );
}

export default ContactPerson;
