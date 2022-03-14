import { Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";

interface Props {
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ViewRemark({ open, setOpen, content }: Props) {
  return (
    <DialogWrapper title="View Remark" open={open} setOpen={setOpen}>
      <Typography variant="body1">{content}</Typography>
    </DialogWrapper>
  );
}

export default ViewRemark;
