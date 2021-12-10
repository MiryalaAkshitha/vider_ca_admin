import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactQuill from "lib/react-quill";

interface Props {
  state: any;
  setState: (state: any) => void;
  handleUpdate: () => void;
}

function Description({ state, setState, handleUpdate }: Props) {
  return (
    <>
      <Typography variant="subtitle1" color="primary">
        Description
      </Typography>
      <Box mt={3}>
        <ReactQuill
          value={state?.description || ""}
          onChange={(v: any) => {
            console.log(v);
            setState({
              ...state,
              description: v,
            });
          }}
          id="overview"
        />
        <Box mt={2} textAlign="right">
          <Button onClick={handleUpdate} variant="contained" color="secondary">
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Description;
