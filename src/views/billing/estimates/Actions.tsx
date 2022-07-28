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
import {
  cancelEstimate,
  downloadEstimate,
  submitForApproval,
} from "api/services/billing/estimates";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";
import ViewApprovalStatus from "./ViewApprovalStatus";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { EstimateStatus } from "../types";
import { StyledActionsMenu } from "../styles";

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

  const { mutate } = useMutation(downloadEstimate, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "estimate.pdf";
      link.click();
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const { mutate: cancel } = useMutation(cancelEstimate, {
    onSuccess: (res: any) => {
      snack.success("Estimate cancelled successfully");
      clearSelection();
      queryClient.invalidateQueries("estimates");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const { mutate: submit } = useMutation(submitForApproval, {
    onSuccess: () => {
      snack.success("Estimate has been submitted for approval");
      clearSelection();
      queryClient.invalidateQueries("estimates");
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  const handlePriview = () => {
    window.open(`/billing/estimates/${selected[0]?.id}/preview`);
  };

  const handleDownload = () => {
    mutate({ id: selected[0]?.id });
  };

  const handleCancel = () => {
    cancel({ id: selected[0]?.id });
  };

  const handleEdit = () => {
    navigate(`/billing/estimates/add?estimateId=${selected[0]?.id}`);
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
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <EditOutlined />
          Edit Estimate
        </MenuItem>
        <MenuItem
          onClick={handleCancel}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <CancelOutlined />
          Cancel Estimate
        </MenuItem>
        <MenuItem
          onClick={handleSubmitForApproval}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status !== EstimateStatus.DRAFT ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <ArrowUpwardIcon />
          Submit for Approval
        </MenuItem>
        <MenuItem
          onClick={handleApprovalStatus}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status !== EstimateStatus.APPROVAL_PENDING ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <ApprovalOutlined />
          View Approval Status
        </MenuItem>
        <MenuItem
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <MailOutline />
          Send Mail
        </MenuItem>
        <MenuItem
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
          onClick={handlePriview}
        >
          <PreviewOutlined />
          Preview
        </MenuItem>
        <MenuItem
          disabled={
            selected.length === 0 ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <MoneyOutlined />
          Convert to Invoice
        </MenuItem>
        <MenuItem
          onClick={handleDownload}
          disabled={
            selected.length !== 1 ||
            selected[0]?.status === EstimateStatus.CANCELLED
          }
        >
          <DownloadOutlined />
          Download Estimate
        </MenuItem>
      </StyledActionsMenu>
      <ViewApprovalStatus
        open={open}
        setOpen={setOpen}
        estimateId={selected[0]?.id}
      />
    </>
  );
};

export default Actions;
