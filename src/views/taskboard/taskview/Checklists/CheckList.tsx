import { Add, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";

type Props = {
  data: any;
};

const CheckList = ({ data }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h6">{data?.name}</Typography>
        <div>
          <IconButton onClick={() => setOpen(!open)}>
            <KeyboardArrowUp />
          </IconButton>
        </div>
      </Box>
      {open && (
        <Box>
          {data?.checklistItems?.map((item: any, index: number) => (
            <Box
              px={2}
              py={1}
              key={index}
              bgcolor={Math.abs((index + 1) % 2) === 1 ? "#FAFAFA" : "white"}
            >
              <FormControlLabel
                control={<Checkbox size="small" color="secondary" />}
                label={item?.name}
              />
            </Box>
          ))}
          <Box textAlign="right" pb={2}>
            <Button startIcon={<Add />} color="secondary">
              Add new checklist item
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CheckList;
