import { Typography } from "@mui/material";
import ReactQuill from "lib/react-quill";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  control: any;
  id?: string;
}

function FormEditor(props: Props) {
  const { name, control, id } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <ReactQuill {...field} id={id} />
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

export default FormEditor;
