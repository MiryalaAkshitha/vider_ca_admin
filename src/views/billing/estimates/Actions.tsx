import {
  ApprovalOutlined,
  CancelOutlined,
  DownloadOutlined,
  EditOutlined,
  MailOutline,
  MoneyOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

const Actions = ({ anchorEl, setAnchorEl }: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      sx={(theme) => ({
        "& .MuiMenuItem-root": {
          py: 1,
          fontSize: 14,
        },
        "& .MuiMenuItem-root:not(:last-child)": {
          borderBottom: "1px solid #ddd4d4",
        },
        "& .MuiSvgIcon-root": {
          fontSize: "20px",
          marginRight: 2,
          color: theme.palette.primary.main,
        },
      })}
    >
      <MenuItem>
        <EditOutlined />
        Edit Estimate
      </MenuItem>
      <MenuItem>
        <CancelOutlined />
        Cancel Estimate
      </MenuItem>
      <MenuItem>
        <ApprovalOutlined />
        View Approval Status
      </MenuItem>
      <MenuItem>
        <MailOutline />
        Send Mail
      </MenuItem>
      <MenuItem>
        <PreviewOutlined />
        Preview
      </MenuItem>
      <MenuItem>
        <MoneyOutlined />
        Convert to Invoice
      </MenuItem>
      <MenuItem>
        <DownloadOutlined />
        Download Estimate
      </MenuItem>
    </Menu>
  );
};

export default Actions;
