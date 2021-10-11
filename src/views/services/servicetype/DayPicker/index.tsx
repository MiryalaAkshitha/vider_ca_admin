import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "assets";
import { useState } from "react";
import SelectDay from "./SelectDay";

interface DayPickerProps {
  value: string;
  onChange: (v: string) => void;
}

function DayPicker({ value, onChange }: DayPickerProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Box
        onClick={() => setOpen(true)}
        border='1px solid lightgrey'
        maxWidth={200}
        justifyContent='space-between'
        p='5px 10px'
        sx={{ cursor: "pointer" }}
        borderRadius='4px'
        display='flex'>
        <Typography color='primary' variant='body2'>
          {value}
        </Typography>
        <img src={icons.date} alt='' />
      </Box>
      <SelectDay open={open} onChange={onChange} setOpen={setOpen} />
    </>
  );
}

export default DayPicker;
