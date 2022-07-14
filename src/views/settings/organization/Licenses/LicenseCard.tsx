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
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledAttachment } from "../styles";
import EditLicense from "./EditLicense";

function LicenseCard({ data }) {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteOrganizationLicense, {
    onSuccess: () => {
      snack.success("License has been deleted");
      queryClient.invalidateQueries("organization_licenses");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this license?",
      action: () => {
        mutate({
          id: data.id,
        });
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
              {_.startCase(data?.type?.toLowerCase())}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">License Name</Typography>
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              {data?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">License Number</Typography>
            <Typography sx={{ fontSize: 15 }} variant="subtitle2">
              {data?.licenseNumber}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom>
              Attachment
            </Typography>
            {data?.attachment ? (
              <StyledAttachment
                sx={{
                  p: 1,
                }}
              >
                <a
                  href={data.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="rgba(0,0,0,0.8)"
                  >
                    {data.attachment}
                  </Typography>
                </a>
              </StyledAttachment>
            ) : (
              <Typography sx={{ fontSize: 15 }} variant="subtitle2">
                NA
              </Typography>
            )}
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
          <MenuItem onClick={() => setOpen(true)}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      </Box>
      <EditLicense open={open} setOpen={setOpen} data={data} />
    </>
  );
}

export default LicenseCard;
