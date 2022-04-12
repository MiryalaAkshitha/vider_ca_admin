import CloudUploadOutlined from "@mui/icons-material/CloudUploadOutlined";
import { Box, CircularProgress, styled, Typography } from "@mui/material";
import { http } from "api/http";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { covertToKb, fileSizeInKb, getFileSize } from "utils";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { icons } from "assets";
import { FILETYPES } from "utils/constants";

interface Props {
  label?: string;
  name: string;
  control: any;
  required?: boolean;
  max: number;
  maxFileSize: {
    type: "KB" | "MB" | "GB";
    size: number;
  };
  accepted: string[];
}

function FormBuilderUpload(props: Props) {
  const {
    name,
    control,
    label = "",
    required = false,
    accepted,
    max,
    maxFileSize,
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
              max={max}
              maxFileSize={maxFileSize}
              accepted={accepted}
              onChange={field.onChange}
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
  onChange: (v: any) => void;
  value: any;
  max: number;
  maxFileSize: {
    type: "KB" | "MB" | "GB";
    size: number;
  };
  accepted: string[];
}

type State = Array<{ file: File; key: string; url: string }>;

function Upload(props: UploadProps) {
  let { onChange, name = "upload", value, max, accepted, maxFileSize } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<State>([]);

  const handleFile = async (files: File[]) => {
    value = Array.isArray(value) ? value : [];

    if (!files.length) return;

    if (files.length > max) {
      alert(`you can only upload ${max} file(s)`);
      return;
    }

    if (files.length + value.length > max) {
      alert(`you can only upload ${max} file(s)`);
      return;
    }

    if (accepted && accepted.length) {
      const acceptedFiles = [...files].filter((file) => {
        return accepted.includes(file.type);
      });
      if (acceptedFiles.length !== files.length) {
        alert("Only files of type " + accepted.join(", ") + " can be uploaded");
        return;
      }
    }

    if (maxFileSize) {
      let exceededFiles = [...files].filter((file) => {
        return (
          fileSizeInKb(file.size) >=
          covertToKb(maxFileSize.size, maxFileSize.type)
        );
      });
      if (exceededFiles.length) {
        alert(
          "File size should not exceed " +
            maxFileSize.size +
            " " +
            maxFileSize.type
        );
        return;
      }
    }

    setLoading(true);
    try {
      let result: any = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        const formData = new FormData();
        formData.append("file", file);
        const res: any = await http.post("/common/upload", formData);
        result.push({ file, key: res.data.key, url: res.data.Location });
      }
      setState([...state, ...result]);
      onChange([...state, ...result].map(({ key }) => key));
    } catch (err: any) {
      alert("something went wrong");
    } finally {
      setLoading(false);
    }
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

  const removeFile = (index: number) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState);
    onChange(newState.map(({ key }) => key));
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
        {state.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              borderTop: "1px dotted grey",
              p: 1,
            }}
          >
            {state.map(
              ({ file, url }: { file: File; url: string }, index: number) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    padding: "5px",
                    display: "flex",
                    gap: 2,
                    maxWidth: "300px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      flex: 1,
                    }}
                  >
                    <Box>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={file.type === FILETYPES.PDF ? icons.pdf : url}
                          alt={file.name}
                          style={{
                            width: 50,
                            height: 40,
                            objectFit: "contain",
                          }}
                        />
                      </a>
                    </Box>
                    <Box>
                      <Typography variant="body2">{file.name}</Typography>
                      <Typography variant="caption" color="rgba(0,0,0,0.5)">
                        {getFileSize(file.size)}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt="4px">
                    <CloseRoundedIcon
                      onClick={() => removeFile(index)}
                      sx={{
                        fontSize: "15px",
                        color: "rgba(0,0,0,0.6)",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                </Box>
              )
            )}
          </Box>
        )}
      </Box>
    </>
  );
}

export default FormBuilderUpload;
