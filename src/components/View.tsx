import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

interface IProps<Type> {
  value: Type;
  onChange: (value: Type) => void;
}

function View({ value, onChange }: IProps<"grid" | "list">) {
  return (
    <Box display="flex" gap={1} justifyContent="flex-end" p={1}>
      <Button
        onClick={() => onChange("grid")}
        variant={value === "grid" ? "contained" : "text"}
        sx={{ minWidth: 0, px: 1 }}
      >
        <GridViewIcon />
      </Button>
      <Button
        onClick={() => onChange("list")}
        variant={value === "list" ? "contained" : "text"}
        sx={{ minWidth: 0, px: 1 }}
      >
        <FormatListBulletedRoundedIcon />
      </Button>
    </Box>
  );
}

export default View;
