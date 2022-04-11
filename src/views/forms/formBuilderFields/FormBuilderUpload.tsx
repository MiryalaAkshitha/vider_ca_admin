import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  control: any;
  required?: boolean;
  multiple?: boolean;
  accepted?: string[];
}

function FormBuilderUpload(props: Props) {
  const {
    name,
    control,
    label = "",
    required = false,
    multiple = false,
    accepted,
  } = props;

  return (
    <>
      <Typography gutterBottom sx={{ display: "block" }} variant="caption">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Upload
              name={field.name}
              value={field.value}
              multiple={multiple}
              accepted={accepted}
              onChange={(v) => {
                console.log(v);
              }}
            />
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export const UploadContainer = styled("div")(() => ({
  display: "flex",
  borderRadius: "8px",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 100,
  textAlign: "center",
  cursor: "pointer",
  padding: "10px 0px",
}));

interface UploadProps {
  name: string;
  onChange: (v: string) => void;
  value?: any;
  multiple?: boolean;
  accepted?: string[];
}

function Upload({
  onChange,
  name = "upload",
  multiple,
  accepted,
}: UploadProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFile = async (files: any) => {
    if (!files.length) return;

    if (files.length > 1 && !multiple) {
      alert("Only one file is required");
      return;
    }

    if (accepted && accepted.length) {
      const acceptedFiles = [...files].filter((file) =>
        accepted.includes(file.type)
      );
      if (acceptedFiles.length !== files.length) {
        alert("Only files of type " + accepted.join(", ") + " can be uploaded");
        return;
      }
    }
    //   setLoading(true);

    console.log(files);
    // try {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   const res: any = await http.post("/common/upload", formData);
    //   onChange(res.data.key);
    // } catch (err: any) {
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleChange = (e: any) => {
    handleFile(e.target.files);
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
    handleFile(e.dataTransfer.files);
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={handleChange}
        name="upload"
        id={name}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          border: "1px dotted grey",
        }}
      >
        <label htmlFor={name}>
          <UploadContainer
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            <div>
              {loading ? (
                <CircularProgress />
              ) : (
                <Box display="flex" gap={1} alignItems="center">
                  <CloudUploadOutlined color="disabled" fontSize="large" />
                  <Typography color="GrayText" sx={{ textAlign: "center" }}>
                    Drag and drop or{" "}
                    <a
                      style={{
                        pointerEvents: "none",
                      }}
                      href=""
                    >
                      choose files
                    </a>
                  </Typography>
                </Box>
              )}
            </div>
          </UploadContainer>
        </label>
      </Box>
    </>
  );
}

export default FormBuilderUpload;
