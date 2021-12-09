import { Typography } from "@mui/material";
import { moveFile } from "api/storage";
import { icons } from "assets";
import RouterLink from "components/RouterLink";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { StyledFolder } from "views/clients/styles";

type Props = {
  data: any;
};

function Folder({ data }: Props) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const snack = useSnack();
  const [dragging, setDragging] = useState(false);
  const [dropping, setDropping] = useState(false);

  const { mutate } = useMutation(moveFile, {
    onSuccess: () => {
      snack.success("Moved successfully");
      queryClient.invalidateQueries("storage");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
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
    let fileId = parseInt(e.dataTransfer.getData("fileId"));
    let folderId = data.id;
    mutate({
      fileId,
      folderId,
    });
  };

  return (
    <RouterLink to={`${location.pathname}?folderId=${data?.uid}`}>
      <StyledFolder
        draggable={true}
        dragging={dragging}
        dropping={dropping}
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
    </RouterLink>
  );
}

export default Folder;
