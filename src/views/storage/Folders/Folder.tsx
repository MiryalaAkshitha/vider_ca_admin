import { Typography } from "@mui/material";
import { moveFile } from "api/services/storage";
import { icons } from "assets";
import useQueryParams from "hooks/useQueryParams";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledFolder } from "views/clients/clients/styles";
import FolderMenu from "../FolderOrFileMenu";
import SameFileOrFolderWarning from "./SameFileOrFolderWarning";

type Props = {
  data: any;
};

type Position = {
  mouseX: number;
  mouseY: number;
};

function Folder({ data }: Props) {
  const queryClient = useQueryClient();
  const { queryParams, setQueryParams } = useQueryParams();
  const [dragging, setDragging] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [contextMenu, setContextMenu] = useState<Position | null>(null);
  const [openWarning, setOpenWarning] = useState(false);
  const [originId, setOriginId] = useState<any>(null);

  const { mutate } = useMutation(moveFile, {
    onSuccess: () => {
      snack.success("Moved successfully");
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      if (err.response.data.status === 409) {
        setOpenWarning(true);
      } else {
        snack.error(err.response.data.message);
      }
    },
  });

  const onDragStart = (e: any) => {
    setDragging(true);
    e.dataTransfer.setData("fileId", data.id);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const preventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: any) => {
    preventDefault(e);
    if (dragging) return;
    setDropping(true);
  };

  const handleDragOver = (e: any) => {
    preventDefault(e);
    if (dragging) return;
    setDropping(true);
  };

  const handleDragLeave = (e: any) => {
    preventDefault(e);
    if (dragging) return;
    setDropping(false);
  };

  const handleDrop = (e: any) => {
    preventDefault(e);

    if (dragging) return;

    setDropping(false);

    let originId = parseInt(e.dataTransfer.getData("fileId"));
    let destinationId = data.id;

    setOriginId(originId);

    mutate({
      originId,
      destinationId,
    });
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null
    );
  };

  return (
    <>
      <StyledFolder
        onClick={() => {
          setQueryParams({
            ...queryParams,
            folderId: data?.uid,
          });
        }}
        onContextMenu={handleContextMenu}
        draggable={true}
        dragging={dragging ? 1 : 0}
        dropping={dropping ? 1 : 0}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <img src={icons.folder} alt="" />
        <Typography variant="body2">{data?.name}</Typography>
      </StyledFolder>
      <FolderMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        data={data}
      />
      <SameFileOrFolderWarning
        open={openWarning}
        setOpen={setOpenWarning}
        originId={originId}
        destinationId={data?.id}
      />
    </>
  );
}

export default Folder;
