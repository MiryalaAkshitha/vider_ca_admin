import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { deleteBillingEntity, getBillingEntity } from "api/services/billingEntity";
import EmptyPage from "components/EmptyPage";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import useFilteredData from "hooks/useFilteredData";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import AddBillingEntity from "views/settings/organization/BillingEntities/AddBillingEntity";

const BillingEntities = () => {
  useTitle("BillingEntity");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(["billing-entities"], getBillingEntity);

  const filteredData = useFilteredData(data?.data, ["legalName"], search);

  if (isLoading) return <Loader />;

  if (!data?.data?.length) {
    return (
      <>
        <EmptyPage
          title="There are no Billing Entities"
          btn2Title="Add New Billing Entity"
          btn2Action={() => setOpen(true)}
          desc="Click on Add New Billing Entity to add a Billing Entity"
        />
        <AddBillingEntity open={open} setOpen={setOpen} />
      </>
    );
  }

  return (
    <Box p={3}>
      <Box>
        <SearchContainer onChange={setSearch} />
      </Box>
      <Table
        sx={{ mt: 3 }}
        onRowClick={(row: any) => {
          navigate(`/settings/billing-entities/${row?.id}`);
        }}
        loading={isLoading}
        data={filteredData || []}
        columns={columns}
      />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddBillingEntity open={open} setOpen={setOpen} />
    </Box>
  );
};

const columns: Array<ColumnType> = [
  { key: "legalName", title: "Legal Name" },
  { key: "tradeName", title: "Trade Name" },
  { key: "category", title: "Category" },
  { key: "email", title: "Trade Name" },
  { key: "mobileNumber", title: "Mobile Number" },
  {
    key: "actions",
    title: "Actions",
    render: (v: any) => {
      return <Actions data={v} />;
    },
  },
];

const Actions = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { mutate } = useMutation(deleteBillingEntity, {
    onSuccess: () => {
      snack.success("Billing entity removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("billing-entities");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      setAnchorEl(null);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/settings/billing-entities/${data.id}`);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to delete this team?",
      action: () => {
        mutate({ id: data.id });
      },
    });
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertOutlinedIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default BillingEntities;
