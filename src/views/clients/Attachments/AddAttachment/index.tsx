import { Add } from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Fab, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { uploadFile } from "api/storage";
import useParams from "hooks/useParams";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import {
  selectStorage,
  setInitialUploads,
  setUploadData,
  setUploadError,
} from "redux/reducers/storageSlice";
import CreateFolderDialog from "./CreateFolderDialog";
import UploadStatusDrawer from "./UploadStatusDrawer";

function AddAttachment() {
  const queryClient = useQueryClient();
  const { uploads } = useSelector(selectStorage);
  const dispatch = useDispatch();
  const match: any = useRouteMatch();
  const params = useParams();
  const snack = useSnack();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

  const clientId = match.params.clientId;
  const folderId = params.get("folderId") || "";

  const { mutateAsync } = useMutation(uploadFile, {
    onSuccess: (res: any) => {
      dispatch(setUploadData(res.data));
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      dispatch(setUploadError(err));
      snack.error(err.response.data.message);
    },
  });

  const handleUploadFiles = (e: any) => {
    if (!e.target.files.length) return;

    dispatch(setInitialUploads(e.target.files));

    Array.from(e.target.files).forEach(async (item: any) => {
      let formData = new FormData();
      formData.append("file", item);
      formData.append("folderId", folderId);
      formData.append("clientId", clientId);
      await mutateAsync(formData);
    });
  };

  return (
    <div>
      <Fab
        size="medium"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="secondary"
        sx={{ position: "fixed", bottom: 30, right: 30, borderRadius: "8px" }}
        aria-label="add"
      >
        <Add />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: "translateY(-10px)",
            minWidth: 200,
            py: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem
          sx={{ py: 1, m: 0 }}
          onClick={() => setOpenCreateDialog(true)}
        >
          <ListItemIcon>
            <Add color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">New Folder</Typography>
        </MenuItem>
        <label htmlFor="files">
          <MenuItem sx={{ py: 1, m: 0 }}>
            <ListItemIcon>
              <UploadFileIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Upload File(s)</Typography>
          </MenuItem>
        </label>
      </Menu>
      <input
        type="file"
        multiple
        onChange={handleUploadFiles}
        id="files"
        style={{ display: "none" }}
      />
      <CreateFolderDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
      {uploads.length ? <UploadStatusDrawer /> : null}
    </div>
  );
}

export default AddAttachment;
