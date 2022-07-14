import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { GreyButton } from "views/tasks/styles";

interface Props {
  data: any;
  state: any;
  onUpdate: () => Promise<any>;
  onCancel: () => void;
  left?: string;
  align?: "left" | "right" | "center";
}

function BottomBar(props: Props) {
  const { data, state, onUpdate, onCancel, left, align } = props;
  const [isStateChanged, setIsStateChanged] = useState(false);

  useEffect(() => {
    setIsStateChanged(JSON.stringify(data) !== JSON.stringify(state));
  }, [state, data]);

  const handleUpdate = async () => {
    try {
      await onUpdate();
      setIsStateChanged(false);
    } catch (e) {}
  };

  const position =
    align === "left" ? "flex-start" : align === "center" ? "center" : "right";

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: isStateChanged ? 0 : "-100%",
        width: `calc(100% - ${left || "240px"})`,
        zIndex: "100",
        transition: "0.8s",
        left: left || "240px",
      }}
    >
      <Box p={2} display="flex" justifyContent={position} gap={2}>
        <Button
          onClick={handleUpdate}
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
