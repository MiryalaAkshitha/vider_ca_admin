import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { removeFile } from "api/services/storage";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import RenameFileOrFolderDialog from "./RenameFileOrFolder";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";

type Position = {
  mouseX: number;
  mouseY: number;
};

interface Props {
  contextMenu: Position | null;
  setContextMenu: (contextMenu: Position | null) => void;
  data: any;
}

function FolderMenu({ contextMenu, data, setContextMenu }: Props) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useMutation(removeFile, {
    onSuccess: () => {
      snack.success("Item deleted successfully");
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this item?",
      action: () => {
        mutate(data.id);
      },
    });
  };

  const openItem = (e: any) => {
    if (data?.type === "folder") {
      navigate(`${location.pathname}?folderId=${data?.uid}`);
    } else {
      window.open(data?.fileUrl);
    }
  };

  const downloadItem = (e: any) => {
    window.open(data?.fileUrl);
  };

  return (
    <>
      <Menu
        open={contextMenu !== null}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        PaperProps={{
          sx: {
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            minWidth: 180,
          },
        }}
        onClose={() => setContextMenu(null)}
        onClick={() => setContextMenu(null)}
      >
        <MenuItem onClick={openItem}>
          <ListItemIcon>
            <FileOpenOutlinedIcon color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Open</Typography>
        </MenuItem>
        <ValidateAccess name={Permissions.EDIT_CLIENT_STORAGE}>
          <MenuItem sx={{ mt: 1 }} onClick={() => setOpen(true)}>
            <ListItemIcon>
              <DriveFileRenameOutlineRoundedIcon
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="body2">Rename</Typography>
          </MenuItem>
        </ValidateAccess>
        <ValidateAccess name={Permissions.DELETE_CLIENT_STORAGE}>
          <MenuItem sx={{ mt: 1 }} onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineRoundedIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Remove</Typography>
          </MenuItem>
        </ValidateAccess>
        {data?.type === "file" && (
          <MenuItem sx={{ mt: 1 }} onClick={downloadItem}>
            <ListItemIcon>
              <FileDownloadOutlinedIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Download</Typography>
          </MenuItem>
        )}
      </Menu>
      <RenameFileOrFolderDialog
        open={open}
        setOpen={setOpen}
        itemName={data?.name}
        itemId={data?.id}
      />
    </>
  );
}

export default FolderMenu;
