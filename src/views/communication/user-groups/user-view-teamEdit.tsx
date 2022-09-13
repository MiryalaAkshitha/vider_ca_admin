import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DrawerWrapper from "components/DrawerWrapper";
import { useState } from "react";
import { DialogProps } from "types";
import TextareaAutosize from "@mui/material/TextareaAutosize";

interface Props extends DialogProps {}

function EditUserTeam({ open, setOpen }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Edit Team Details">
        <form onSubmit={handleSubmit}>
          <TextField
            label="User Team Title"
            name="name"
            size="small"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextField
            label="Description"
            name="name"
            size="medium"
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            type="textarea"
            sx={{ marginTop: "24px" }}
            multiline
          />

          <Box mt={2} textAlign="center">
            <Button variant="contained" color="secondary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </DrawerWrapper>
    </>
  );
}

export default EditUserTeam;
