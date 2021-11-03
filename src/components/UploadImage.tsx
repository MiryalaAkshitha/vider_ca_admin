import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, SystemStyleObject } from "@mui/system";
import { http } from "api/http";
import { useSnackbar } from "notistack";
import { useState } from "react";

export const UploadContainer = styled("div")(() => ({
  border: "1px dotted grey",
  display: "flex",
  borderRadius: "8px",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 150,
  textAlign: "center",
  cursor: "pointer",
}));

interface UploadProps {
  name: string;
  onChange: (v: string) => void;
  sx?: SystemStyleObject;
}

function UploadImage({ onChange, name, sx }: UploadProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = async (file: any) => {
    if (!file) return;
    try {
      setLoading(true);
      setFile(file);
      setFileName(file.name);
      let formData = new FormData();
      formData.append("file", file);
      let res: any = await http.post("/common/upload", formData);
      onChange(res.data.key);
    } catch (err: any) {
      enqueueSnackbar(err.response.data.message, {
        variant: "error",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleChange = (e: any) => {
    handleFile(e.target.files[0]);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        name="upload"
        id="file"
        style={{ display: "none" }}
      />
      <label htmlFor="file">
        <UploadContainer
          sx={sx}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragEnter={(e) => handleDragEnter(e)}
          onDragLeave={(e) => handleDragLeave(e)}
        >
          <div>
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <CloudUploadOutlinedIcon color="disabled" fontSize="large" />
                <Typography color="GrayText" sx={{ textAlign: "center" }}>
                  Drag and drop or Browse
                </Typography>
                {file && (
                  <Box mt={1} width="100%" borderRadius={8}>
                    <Typography variant="body1">{fileName}</Typography>
                  </Box>
                )}
              </>
            )}
          </div>
        </UploadContainer>
      </label>
    </>
  );
}

export default UploadImage;
