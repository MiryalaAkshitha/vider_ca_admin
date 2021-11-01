import { DeleteOutlineOutlined, DownloadOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import {
  StyledFile,
  StyledFileFooter,
  StyledFileTitle,
} from "views/clients/styles";
import { renderFile } from "./renderFile";

function File({ data }: any) {
  const [dragging, setDragging] = useState(false);

  const onDragStart = (e: any) => {
    setDragging(true);
    e.dataTransfer.setData("fileId", data.id);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  return (
    <StyledFile
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
      <StyledFileFooter>
        <StyledFileTitle variant="body2">{data?.name}</StyledFileTitle>
        <Box display="flex" gap={1}>
          <div>
            <IconButton size="small">
              <DeleteOutlineOutlined fontSize="small" color="secondary" />
            </IconButton>
          </div>
          <div>
            <a href={data?.fileUrl}>
              <IconButton size="small">
                <DownloadOutlined fontSize="small" color="secondary" />
              </IconButton>
            </a>
          </div>
        </Box>
      </StyledFileFooter>
    </StyledFile>
  );
}

export default File;
