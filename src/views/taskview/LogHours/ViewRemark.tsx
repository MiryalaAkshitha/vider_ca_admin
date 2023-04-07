import { Box, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import moment from "moment";
import { getTitle } from "utils";

interface Props {
  activities: any;
  content: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ViewRemark({ open, setOpen, content, activities }: Props) {
  return (
    <DialogWrapper title="View Remark" open={open} setOpen={setOpen}>
      <Typography variant="body1">{content}</Typography>
      <Box>
        <ol>
          {activities.map((item: any, index: number) => (
            <li key={index} style={{ marginBottom: 20 }}>
              <Typography gutterBottom variant="body1">
                {item.remarks} -{" "}
                <span style={{ fontSize: 12 }}>{getTitle(item?.remarkType)}</span>
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ fontSize: 12, color: "rgba(0,0,0,0.5)" }}
              >
                Created By {item.user?.fullName} on{" "}
                {moment(item.createdAt).format("DD-MM-YYYY")}
              </Typography>
            </li>
          ))}
        </ol>
      </Box>
    </DialogWrapper>
  );
}

export default ViewRemark;
