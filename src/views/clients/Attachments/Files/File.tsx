import { DeleteOutlineOutlined, DownloadOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { renderFile } from "./renderFile";

function File({ data }: any) {
  return (
    <Box
      sx={{
        border: "1px solid #DDDDDD",
        borderRadius: 4,
        height: 220,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflow: "hidden",
      }}>
      <Box flex={1}>{renderFile(data)}</Box>
      <Box
        display='flex'
        width='100%'
        alignItems='center'
        gap={1}
        px={2}
        py={1}
        bgcolor='#FBF9F2'>
        <Typography
          variant='body2'
          sx={{
            flex: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}>
          {data?.name}
        </Typography>
        <Box display='flex' gap={1}>
          <div>
            <IconButton size='small'>
              <DeleteOutlineOutlined fontSize='small' color='secondary' />
            </IconButton>
          </div>
          <div>
            <a href={data?.fileUrl}>
              <IconButton size='small'>
                <DownloadOutlined fontSize='small' color='secondary' />
              </IconButton>
            </a>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default File;
