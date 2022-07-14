import { Box, Grid } from "@mui/material";
import { getApprvalHeirarchies } from "api/services/approval-heirarchy";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import ApprovalHierarchyCard from "views/settings/approval-hierarchies/AppHierarchyCard";

function Approvals() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data, isLoading }: ResType = useQuery(
    "approval-heirarchies",
    getApprvalHeirarchies
  );

  const filteredData = useFilteredData(data?.data, ["name"], search);

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Box>
        <SearchContainer onChange={setSearch} />
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredData?.map((item: any, index: number) => (
          <Grid item xs={6} key={index}>
            <ApprovalHierarchyCard item={item} />
          </Grid>
        ))}
      </Grid>
      <FloatingButton onClick={() => navigate(`add-approval`)} />
    </Box>
  );
}

export default Approvals;
