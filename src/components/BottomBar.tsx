import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { GreyButton } from "views/taskboard/styles";

interface Props {
  data: any;
  state: any;
  onUpdate?: () => void;
  onCancel?: () => void;
}

function BottomBar({ data, state, onUpdate, onCancel }: Props) {
  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    setIsStateChanged(JSON.stringify(data) !== JSON.stringify(state));
  }, [state, data]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: isStateChanged ? 0 : "-100%",
        width: "100%",
        zIndex: "100",
        transition: "0.8s",
        left: 70,
      }}
    >
      <Box p={2} display="flex" justifyContent="center" gap={2}>
        <Button
          onClick={() => {
            setIsStateChanged(false);
            onUpdate && onUpdate();
          }}
          size="large"
          color="secondary"
          variant="contained"
        >
          Update
        </Button>
        <GreyButton
          onClick={onCancel}
          size="large"
          color="secondary"
          variant="contained"
        >
          Cancel
        </GreyButton>
      </Box>
    </Paper>
  );
}

export default BottomBar;
