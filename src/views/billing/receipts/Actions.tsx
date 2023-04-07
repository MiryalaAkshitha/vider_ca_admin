import {
  ApprovalOutlined,
  CancelOutlined,
  DownloadOutlined,
  EditOutlined,
  MailOutline,
  Payment,
  PreviewOutlined,
} from "@mui/icons-material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Menu, MenuItem } from "@mui/material";
import {
  cancelInvoice,
  downloadInvoice,
  submitInvoiceForApproval,
} from "api/services/billing/invoices";
import { downloadReceipt } from "api/services/billing/receipts";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange } from "redux/reducers/createReceiptSlice";
import { handleError } from "utils/handleError";
import { StyledActionsMenu } from "../styles";
import { InvoiceStatus } from "../types";


interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  selected: any[];
  clearSelection: () => void;
}

const Actions = (props: Props) => {
  const { anchorEl, setAnchorEl, selected, clearSelection } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(downloadReceipt, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "receipt.pdf";
      link.click();
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handlePriview = () => {
    window.open(`/billing/receipts/${selected[0]?.id}/preview`);
  };

  const handleDownload = () => {
    mutate({ id: selected[0]?.id });
  };


  return (
    <>
      <StyledActionsMenu
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
          onClick={handlePriview}
        >
          <PreviewOutlined />
          Preview
        </MenuItem>
        <MenuItem
          onClick={handleDownload}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <DownloadOutlined />
          Download Receipt
        </MenuItem>
      </StyledActionsMenu>

    </>
  );
};

export default Actions;
