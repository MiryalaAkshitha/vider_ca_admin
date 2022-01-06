import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Close } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box, SystemStyleObject } from "@mui/system";
import { StyledFileChip, UploadContainer } from "./styles";
import { useState } from "react";

interface UploadProps {
  sx?: SystemStyleObject;
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
  name?: string;
}

function FileDrop({
  sx,
  onChange,
  name = "upload",
  multiple = false,
  accept,
}: UploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: any) => {
    if (!e.target.files.length) return;
    if (multiple) {
      setFiles([...files, ...e.target.files]);
      onChange && onChange([...files, ...e.target.files]);
    } else {
      setFiles([e.target.files[0]]);
      onChange && onChange([e.target.files[0]]);
    }
  };

  const handleFileRemove = (e: any, index: number) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onChange && onChange(newFiles);
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
    if (multiple) {
      setFiles([...files, ...e.dataTransfer.files]);
      onChange && onChange([...files, ...e.dataTransfer.files]);
    } else {
      setFiles([e.dataTransfer.files[0]]);
      onChange && onChange([e.dataTransfer.files[0]]);
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        name={name}
        multiple={multiple}
        id={name}
        style={{ display: "none" }}
        {...(accept && { accept })}
      />
      <label htmlFor={name}>
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
              <Box
                px={4}
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                mt={3}
                gap={2}
              >
                {[...files].map((file, index) => (
                  <StyledFileChip>
                    <Typography variant="body2" key={index}>
                      {file.name}
                    </Typography>
                    {multiple && (
                      <Close
                        onClick={(e) => handleFileRemove(e, index)}
                        sx={{ fontSize: 14, mt: "3px" }}
                      />
                    )}
                  </StyledFileChip>
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
