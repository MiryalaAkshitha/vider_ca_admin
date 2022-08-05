import { MoreVert } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "assets";
import { useState } from "react";
import { StyledFile, StyledSingleLineContainer } from "views/clients/styles";
import FolderMenu from "../FolderOrFileMenu";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export type Position = {
  mouseX: number;
  mouseY: number;
};

type Props = {
  data: any;
  editPermission?: boolean;
  deletePermission?: boolean;
};

function Link(props: Props) {
  const { data } = props;
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
        dragging={dragging ? 1 : 0}
        sx={{ background: "rgba(0,0,0,0.04)" }}
      >
        <Box p={1} display="flex" gap={1} alignItems="center">
          <Box sx={{ flex: 1 }}>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              onClick={() => window.open(data?.file)}
              sx={{ cursor: "pointer" }}
            >
              <div>
                <img src={icons.onedrive} alt="OneDrive" width="20px" />
              </div>
              <Typography variant="body2">{data.name}</Typography>
              <OpenInNewIcon color="secondary" fontSize="small" />
            </Box>
            {data?.user && (
              <StyledSingleLineContainer>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                  Uploaded by {data?.user?.fullName}
                </Typography>
              </StyledSingleLineContainer>
            )}
          </Box>
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

export default Link;
