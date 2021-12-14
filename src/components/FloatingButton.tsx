import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";

type Props = {
  onClick: () => void;
  position?: "left" | "right";
};

function FloatingButton({ onClick, position = "right" }: Props) {
  return (
    <div>
      <Fab
        size="medium"
        onClick={onClick}
        color="secondary"
        sx={{
          position: "fixed",
          bottom: 40,
          ...(position === "left" ? { left: 40 } : { right: 40 }),
          borderRadius: "8px",
          zIndex: 100,
        }}
        aria-label="add"
      >
        <Add />
      </Fab>
    </div>
  );
}

export default FloatingButton;
