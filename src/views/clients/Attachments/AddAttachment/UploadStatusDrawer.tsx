import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import {
  AppBar,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { resetUploads, selectStorage } from "redux/reducers/storageSlice";

function UploadStatusDrawer() {
  const dispatch = useDispatch();
  const { uploads } = useSelector(selectStorage);

  return (
    <Box
      sx={{
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        background: "white",
        width: "400px",
        border: "1px solid black",
        position: "fixed",
        left: 20,
      }}
      bottom={0}>
      <AppBar sx={{ background: "black" }} position='static'>
        <Box alignItems='center' px={2} py={1} display='flex' gap={2}>
          <Typography flex={1} variant='body1' color='white'>
            Uploads
          </Typography>
          <IconButton onClick={() => dispatch(resetUploads())}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </AppBar>
      <Box p={2} maxHeight={400} sx={{ overflowY: "auto" }}>
        {uploads.map((item, index) => (
          <Box display='flex' mb={2} gap={1} key={index}>
            <Typography
              sx={{
                flex: 1,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}>
              {item.name}
            </Typography>
            <Box>
              {item.data && <CheckCircleIcon sx={{ color: "green" }} />}
              {item.error && <ImageNotSupportedIcon sx={{ color: "red" }} />}
              {item.loading && <CircularProgress size='20px' />}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default UploadStatusDrawer;
