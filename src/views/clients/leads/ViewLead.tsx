import { Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { DialogProps } from "types";

interface Props extends DialogProps {
  data: any;
}

function ViewLead({ open, setOpen, data }: Props) {
  return (
    <DialogWrapper
      width="xs"
      open={open}
      setOpen={setOpen}
      title="Lead information"
    >
      <Typography variant="body2">{data?.description}</Typography>
    </DialogWrapper>
  );
}

export default ViewLead;
