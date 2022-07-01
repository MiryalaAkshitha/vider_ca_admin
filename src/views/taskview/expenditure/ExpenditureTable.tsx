import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { deleteExpenditure } from "api/services/expenditure";
import { useConfirm } from "context/ConfirmDialog";
import Table from "components/Table";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getTitle } from "utils";
import EditExpenditure from "./EditExpenditure";
import TotalAmounts from "./TotalAmounts";

function ExpenditureTable({ data }) {
  return (
    <Box>
      <Table data={data || []} columns={columns} loading={false} />
      <TotalAmounts data={data} taskFee={data[0]?.task?.feeAmount} />
    </Box>
  );
}

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { mutate } = useMutation(deleteExpenditure, {
    onSuccess: (res) => {
      snack.success("Expenditure deleted");
      queryClient.invalidateQueries("expenditure");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        mutate(data?.id);
      },
    });
  };

  return (
    <>
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          onClick={() => {
            setSelected(data);
            setOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
      <EditExpenditure open={open} data={selected} setOpen={setOpen} />
    </>
  );
};

const columns = [
  {
    key: "particularName",
    title: "Particular",
  },
  {
    key: "type",
    title: "Expenditure Type",
    render: (rowData) => getTitle(rowData?.type),
  },
  {
    key: "amount",
    title: "Amount",
  },
  {
    key: "attachment",
    title: "Attachment",
    render: (rowData: any) =>
      rowData?.attachment ? (
        <a
          download={rowData?.attachment}
          href={rowData?.attachmentUrl}
          style={{
            whiteSpace: "nowrap",
            display: "inline-block",
            maxWidth: 200,
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {rowData?.attachment}
        </a>
      ) : (
        "NA"
      ),
  },
  {
    key: "",
    title: "Include in Invoice",
    render: (rowData) => {
      return rowData?.includeInInvoice ? "Yes" : "No";
    },
  },
  {
    key: "actions",
    title: "Actions",
    render: (rowData: any) => <Actions data={rowData} />,
  },
];

export default ExpenditureTable;
