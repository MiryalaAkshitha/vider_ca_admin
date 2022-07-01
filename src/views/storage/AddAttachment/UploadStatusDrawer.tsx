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
import {
  StyledFileTitle,
  StyledUploadStatusDrawer,
} from "views/clients/styles";

function UploadStatusDrawer() {
  const dispatch = useDispatch();
  const { uploads } = useSelector(selectStorage);

  return (
    <StyledUploadStatusDrawer>
      <AppBar sx={{ background: "black" }} position="static">
        <Box alignItems="center" px={2} py={1} display="flex" gap={2}>
          <Typography flex={1} variant="body1" color="white">
            Uploads
          </Typography>
          <IconButton onClick={() => dispatch(resetUploads())}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </AppBar>
      <Box p={2} maxHeight={400} sx={{ overflowY: "auto" }}>
        {uploads.map((item, index) => (
          <Box display="flex" mb={2} gap={1} key={index}>
            <StyledFileTitle>{item.name}</StyledFileTitle>
            <Box>
              {item.data && <CheckCircleIcon sx={{ color: "green" }} />}
              {item.error && <ImageNotSupportedIcon sx={{ color: "red" }} />}
              {item.loading && <CircularProgress size="20px" />}
            </Box>
          </Box>
        ))}
      </Box>
    </StyledUploadStatusDrawer>
  );
}

export default UploadStatusDrawer;
