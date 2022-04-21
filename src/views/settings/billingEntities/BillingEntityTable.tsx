import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Actions from "./Actions";
import AddBillingEntities from "./AddBillingEntities";

const BillingEntityTable = ({ data, isLoading }) => {
  useTitle("BillingEntity");
  const [open, setOpen] = useState<boolean>(false);

  const columns: Array<ColumnType> = [
    { key: "name", title: "Billing Entity Name" },
    { key: "category", title: "Billing Entity Category" },
    { key: "type", title: "Billing Entity Type" },
    {
      key: "actions",
      title: "Actions",
      render: (v: any) => {
        return <Actions data={v} />;
      },
    },
  ];

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState<any[]>([]);

  const handleRowClick = (v: any) => {
    navigate(`/settings/billing-entities/${v.id}`);
  };

  return (
    <>
      <Box>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={5}>
            <Box display="flex" gap={2} alignItems="center">
              <SearchContainer
                value="{filters.search}"
                debounced
                minWidth="400px"
                onChange={(v) => {}}
                placeHolder="Search"
              />
              <Button
                startIcon={<FilterAltOutlinedIcon />}
                color="primary"
                sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
              >
                Filters
              </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" gap={2}>
              {selected.length > 0 && (
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  variant="outlined"
                  color="secondary"
                  endIcon={<KeyboardArrowDownOutlinedIcon />}
                >
                  Actions
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        <Table
          sx={{ mt: 3 }}
          loading={isLoading}
          data={data?.data || []}
          columns={columns}
        />
        <FloatingButton onClick={() => setOpen(true)} />
      </Box>
      <AddBillingEntities open={open} setOpen={setOpen} />
    </>
  );
};

export default BillingEntityTable;
