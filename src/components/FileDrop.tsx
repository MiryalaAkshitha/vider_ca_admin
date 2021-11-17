import { Close } from "@mui/icons-material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, SystemStyleObject } from "@mui/system";

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
  padding: 20,
}));

interface UploadProps {
  sx?: SystemStyleObject;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

function FileDrop({ sx, files, setFiles }: UploadProps) {
  const handleChange = (e: any) => {
    if (!e.target.files.length) return;
    setFiles([...files, ...e.target.files]);
  };

  const handleFileRemove = (e: any, index: number) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
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
    if (!e.dataTransfer.files.length) return;
    setFiles([...files, ...e.dataTransfer.files]);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        name="upload"
        multiple
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
            <CloudUploadOutlinedIcon color="disabled" fontSize="large" />
            <Typography color="GrayText" sx={{ textAlign: "center" }}>
              Drag and drop or Browse
            </Typography>
            {files.length !== 0 && (
              <Box px={4} display="flex" flexWrap="wrap" mt={5} gap={2}>
                {[...files].map((file, index) => (
                  <Box
                    onClick={(e) => handleFileRemove(e, index)}
                    sx={{
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: "5px",
                    }}
                  >
                    <Typography variant="body2" key={index}>
                      {file.name}
                    </Typography>
                    <Close sx={{ fontSize: 14, mt: "3px" }} />
                  </Box>
                ))}
              </Box>
            )}
          </div>
        </UploadContainer>
      </label>
    </>
  );
}

export default FileDrop;
