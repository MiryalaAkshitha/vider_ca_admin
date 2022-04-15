import { Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Upload from "./Upload";

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
  id: string;
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
    id,
  } = props;

  const [fileError, setFileError] = useState("");

  return (
    <>
      <Typography gutterBottom variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Upload
              id={id}
              value={field.value}
              max={max}
              maxFileSize={maxFileSize}
              accepted={accepted}
              onChange={field.onChange}
              setError={setFileError}
            />
            {(fileError || error) && (
              <Typography
                variant="caption"
                sx={{ pl: "2px", pt: "6px" }}
                color="rgb(211, 47, 47)"
              >
                {fileError || error?.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormBuilderUpload;
