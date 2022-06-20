import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { removeFile } from "api/services/storage";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { selectStorage } from "redux/reducers/storageSlice";
import RenameFileOrFolderDialog from "./RenameFileOrFolder";

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
  const { permissions } = useSelector(selectStorage);
  const queryClient = useQueryClient();
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
        {permissions.edit && (
          <MenuItem sx={{ mt: 1 }} onClick={() => setOpen(true)}>
            <ListItemIcon>
              <DriveFileRenameOutlineRoundedIcon
                color="primary"
                fontSize="small"
              />
            </ListItemIcon>
            <Typography variant="body2">Rename</Typography>
          </MenuItem>
        )}
        {permissions.delete && (
          <MenuItem sx={{ mt: 1 }} onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineRoundedIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">Remove</Typography>
          </MenuItem>
        )}
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
