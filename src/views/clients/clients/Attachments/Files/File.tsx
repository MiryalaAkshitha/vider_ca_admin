import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { StyledFile, StyledFileTitle } from "views/clients/clients/styles";
import FolderMenu from "../FolderOrFileMenu";
import { renderFile } from "./renderFile";

type Props = {
  data: any;
};

type Position = {
  mouseX: number;
  mouseY: number;
};

function File({ data }: Props) {
  const [dragging, setDragging] = useState(false);
  const [contextMenu, setContextMenu] = useState<Position | null>(null);

  const onDragStart = (e: any) => {
    setDragging(true);
    e.dataTransfer.setData("fileId", data.id);
  };

  const onDragEnd = () => {
    setDragging(false);
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
      <StyledFile
        onDoubleClick={() => {
          window.open(data?.fileUrl);
        }}
        draggable={true}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        dragging={dragging}
      >
        <Box
          width="100%"
          height="200px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {renderFile(data)}
        </Box>
        <Box
          bgcolor="#FBF9F2"
          p={1}
          display="flex"
          justifyContent="space-between"
          gap={1}
          alignItems="center"
        >
          <StyledFileTitle variant="body2">{data?.name}</StyledFileTitle>
          <IconButton size="small" onClick={handleContextMenu}>
            <MoreVert />
          </IconButton>
        </Box>
      </StyledFile>
      <FolderMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        data={data}
      />
    </>
  );
}

export default File;
