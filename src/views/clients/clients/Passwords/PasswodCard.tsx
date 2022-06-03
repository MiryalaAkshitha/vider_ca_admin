import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deleteClientPassword } from "api/services/client-info";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditPassword from "./EditPassword";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";

type Props = {
  data: any;
};

function PasswordCard({ data }: Props) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editOpen, setEditOpen] = useState(false);

  const { mutate } = useMutation(deleteClientPassword, {
    onSuccess: () => {
      snack.success("Password Removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("client-passwords");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      setAnchorEl(null);
    },
  });

  const handleDelete = () => {
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to delete this password?",
      action: () => {
        mutate(data?.id);
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 2,
          p: 2,
          mb: 4,
          display: "flex",
        }}
      >
        <Grid sx={{ flex: 1 }} container justifyContent="space-between">
          <Grid item xs={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
              Website
            </Typography>
            <Typography color="primary" gutterBottom variant="body1">
              {data?.website}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
              Website Url
            </Typography>
            <Box sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={data?.websiteUrl}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  gutterBottom
                  color="primary"
                  variant="body1"
                >
                  {data?.websiteUrl}
                </Typography>
              </a>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
              Login ID
            </Typography>
            <Typography gutterBottom variant="body1">
              {data?.loginId}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
              Password
            </Typography>
            {show ? (
              <Typography gutterBottom variant="body1">
                {data?.password}
              </Typography>
            ) : (
              <Typography
                onClick={() => setShow(true)}
                style={{ cursor: "pointer", color: "#149ECD" }}
                gutterBottom
                variant="body1"
              >
                Click to see
              </Typography>
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
              Last Modified on
            </Typography>
            <Typography gutterBottom variant="body1">
              {moment(data?.updatedAt).format("DD MMM, YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertRounded />
          </IconButton>
        </Box>
      </Box>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
      >
        <ValidateAccess name={Permissions.EDIT_CLIENT_PASSWORDS}>
          <MenuItem onClick={() => setEditOpen(true)}>Edit</MenuItem>
        </ValidateAccess>
        <ValidateAccess name={Permissions.DELETE_CLIENT_PASSWORDS}>
          <MenuItem onClick={handleDelete}>Remove</MenuItem>
        </ValidateAccess>
      </Menu>
      <EditPassword open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default PasswordCard;
