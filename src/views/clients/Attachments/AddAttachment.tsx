import { Add } from "@mui/icons-material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Button,
  Dialog,
  Fab,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { createFolder } from "api/storage";
import useParams from "hooks/useParams";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useRouteMatch } from "react-router";
import { DialogProps } from "types";

function AddAttachment() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Fab
        size='medium'
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color='secondary'
        sx={{ position: "fixed", bottom: 30, right: 30, borderRadius: "8px" }}
        aria-label='add'>
        <Add />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: "translateY(-10px)",
            minWidth: 200,
            py: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}>
        <MenuItem
          sx={{ py: 1, m: 0 }}
          onClick={() => setOpenCreateDialog(true)}>
          <ListItemIcon>
            <Add color='primary' fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2'>New Folder</Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1, m: 0 }}>
          <ListItemIcon>
            <UploadFileIcon color='primary' fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2'>Upload File(s)</Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1, m: 0 }}>
          <ListItemIcon>
            <DriveFolderUploadIcon color='primary' fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2'>Upload Folder</Typography>
        </MenuItem>
      </Menu>
      <CreateFolderDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
    </div>
  );
}

const CreateFolderDialog = ({ open, setOpen }: DialogProps) => {
  const [name, setName] = useState<string>("Untitled folder");
  const queryClient = useQueryClient();
  const match: any = useRouteMatch();
  const snack = useSnack();
  const inputRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const clientId = match.params.clientId;

  const { mutate } = useMutation(createFolder, {
    onSuccess: () => {
      snack.success("Folder Created");
      setOpen(false);
      setName("Untitled folder");
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    if (!name) {
      inputRef.current?.focus();
      return;
    }
    let folderIds = params.get("folderId")?.split("|");
    let folderId = folderIds?.length ? folderIds[folderIds.length - 1] : null;
    mutate({
      name,
      clientId,
      folderId,
    });
  };

  return (
    <Dialog open={open} maxWidth='xs' fullWidth PaperProps={{ sx: { p: 2 } }}>
      <Typography variant='subtitle1' sx={{ mb: 3 }}>
        New Folder
      </Typography>
      <TextField
        inputRef={inputRef}
        onChange={(e) => setName(e.target.value)}
        size='small'
        value={name}
      />
      <Box mt={4} display='flex' gap={2} justifyContent='flex-end'>
        <Button onClick={() => setOpen(false)} variant='outlined'>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant='contained' color='secondary'>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddAttachment;
