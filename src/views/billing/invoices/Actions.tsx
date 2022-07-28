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
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";
import { StyledActionsMenu } from "../styles";
import { InvoiceStatus } from "../types";
import ViewApprovalStatus from "./ViewApprovalStatus";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  selected: any[];
  clearSelection: () => void;
}

const Actions = (props: Props) => {
  const { anchorEl, setAnchorEl, selected, clearSelection } = props;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(downloadInvoice, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "invoice.pdf";
      link.click();
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { mutate: cancel } = useMutation(cancelInvoice, {
    onSuccess: (res: any) => {
      snack.success("Invoice cancelled successfully");
      clearSelection();
      queryClient.invalidateQueries("invoices");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const { mutate: submit } = useMutation(submitInvoiceForApproval, {
    onSuccess: () => {
      snack.success("Invoice has been submitted for approval");
      clearSelection();
      queryClient.invalidateQueries("invoices");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handlePriview = () => {
    window.open(`/billing/invoices/${selected[0]?.id}/preview`);
  };

  const handleDownload = () => {
    mutate({ id: selected[0]?.id });
  };

  const handleCancel = () => {
    cancel({ id: selected[0]?.id });
  };

  const handleEdit = () => {
    navigate(`/billing/invoices/add?estimateId=${selected[0]?.id}`);
  };

  const handleApprovalStatus = () => {
    setOpen(true);
  };

  const handleSubmitForApproval = () => {
    submit({ id: selected[0]?.id });
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
          onClick={handleEdit}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <EditOutlined />
          Edit Invoice
        </MenuItem>
        <MenuItem
          onClick={handleCancel}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <CancelOutlined />
          Cancel Invoice
        </MenuItem>
        <MenuItem
          onClick={() =>
            navigate(`/billing/invoices/${selected[0]?.id}/receipt`)
          }
          disabled={
            selected.length !== 1 ||
            selected[0]?.status !== InvoiceStatus.APPROVED
          }
        >
          <Payment />
          Create Payment Receipt
        </MenuItem>
        <MenuItem
          onClick={handleSubmitForApproval}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status !== InvoiceStatus.DRAFT ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <ArrowUpwardIcon />
          Submit for Approval
        </MenuItem>
        <MenuItem
          onClick={handleApprovalStatus}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status !== InvoiceStatus.APPROVAL_PENDING ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <ApprovalOutlined />
          View Approval Status
        </MenuItem>
        <MenuItem
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === InvoiceStatus.CANCELLED
          }
        >
          <MailOutline />
          Send Mail
        </MenuItem>
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
          Download Invoice
        </MenuItem>
      </StyledActionsMenu>
      <ViewApprovalStatus
        open={open}
        setOpen={setOpen}
        invoiceId={selected[0]?.id}
      />
    </>
  );
};

export default Actions;
