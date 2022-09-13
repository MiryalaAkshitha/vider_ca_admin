import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, SystemStyleObject } from "@mui/system";
import { http } from "api/http";
import { useState } from "react";
import { snack } from "./toast";

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
  padding: "10px 0px",
}));

interface UploadProps {
  name: string;
  onChange: (v: string) => void;
  sx?: SystemStyleObject;
  label?: string;
  widthoutIcon?: boolean;
  accept?: string[];
}

function UploadImage({
  onChange,
  name = "upload",
  sx,
  label = "Drag and drop or Browse",
  widthoutIcon = false,
  accept,
}: UploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFile = async (file: any) => {
    if (!file) return;

    if (accept && !accept.includes(file.type)) {
      return snack.error(`Only ${accept.join(", ")} types are accepted`);
    }

    try {
      setLoading(true);
      setFile(file);
      setFileName(file.name);
      const formData = new FormData();
      formData.append("file", file);
      const res: any = await http.post("/common/upload", formData);
      onChange(res.data.key);
    } catch (err: any) {
      snack.error(err.response.data.message);
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
        id={name}
        style={{ display: "none" }}
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
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                {!widthoutIcon && <CloudUploadOutlinedIcon color="disabled" fontSize="large" />}
                <Typography color="GrayText" sx={{ textAlign: "center" }}>
                  {label}
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
