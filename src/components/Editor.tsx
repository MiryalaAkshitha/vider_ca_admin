import { Typography } from "@mui/material";

function Editor() {
  return (
    <div
      contentEditable
      style={{
        border: "1px solid rgba(0,0,0,0.1)",
        minHeight: 150,
        borderRadius: 2,
      }}>
      <Typography color='gray' sx={{ p: 2, outline: "none" }}>
        Editor
      </Typography>
    </div>
  );
}

export default Editor;
