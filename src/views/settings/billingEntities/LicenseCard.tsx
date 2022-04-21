import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deleteOrganizationLicense } from "api/services/organization";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

function LicenseCard() {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const confirm = useConfirm();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { mutate } = useMutation(deleteOrganizationLicense, {
    onSuccess: () => {
      snack.success("License has been deleted");
      queryClient.invalidateQueries("organization_licenses");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this license?",
      action: () => {
        mutate({});
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          background: "#FBF9F2",
          borderRadius: "8px",
          p: 2,
          position: "relative",
          width: "47%",
          margin: "10px",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            "&>*": {
              marginTop: "20px",
            },
          }}
        >
          <Grid item xs={6}>
            <Typography variant="body2">License Type</Typography>
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              license type
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">License Name</Typography>
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              name
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">License Number</Typography>
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              1234567
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              Attachment
            </Typography>
          </Grid>
        </Grid>
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 20,
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          onClick={() => setAnchorEl(null)}
          open={Boolean(anchorEl)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default LicenseCard;
