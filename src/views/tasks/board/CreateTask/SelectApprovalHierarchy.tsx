import {
  Box,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getApprvalHeirarchies } from "api/services/approval-heirarchy";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import { StyledServiceItem, StyledServicesContainer } from "./styles";

interface Props extends DialogProps {
  onChange: (value: any) => void;
}

function SelectApprovalHierarchy({ open, setOpen, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const { data, isLoading }: ResType = useQuery(
    "approval-hierarchies",
    getApprvalHeirarchies,
    {
      enabled: open,
    }
  );

  function getData() {
    let result = data?.data ? [...data?.data] : [];
  
    if (search) {
      result = result?.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    result = result?.filter((item) => item.type === "TASK");
  
    return result;
  }

  const handleClick = (appHier: any) => {
    onChange(appHier);
    setOpen(false);
  };

  return (
    <DialogWrapper
      width="lg"
      open={open}
      setOpen={setOpen}
      title="Select Approval Hierarchy"
    >
      {/* <Box display="flex" justifyContent="space-between">
        <TextField
          label="Filter By Type"
          variant="outlined"
          size="small"
          sx={{
            width: 200,
          }}
          select
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="SERVICE">Service</MenuItem>
          <MenuItem value="TASK">Task</MenuItem>
          <MenuItem value="IPRO">I-Pro</MenuItem>
        </TextField>
        <Box display="flex" gap={1}>
          <SearchContainer
            value={search}
            placeHolder="Search"
            minWidth="300px"
            onChange={setSearch}
          />
        </Box>
      </Box> */}
      {/* <Divider sx={{ mt: 2 }} /> */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Grid container spacing={2}>
              {getData()?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <StyledServiceItem onClick={() => handleClick(item)}>
                    <Box>
                      <Typography variant="caption" color="rgba(0,0,0,0.6)">
                        {item?.type}
                      </Typography>
                      <Typography variant="subtitle2">{item?.name}</Typography>
                      <Typography
                        mt={1}
                        color="rgba(0,0,0,0.6)"
                        variant="body2"
                      >
                        Levels ({item?.approvalLevels?.length})
                      </Typography>
                    </Box>
                  </StyledServiceItem>
                </Grid>
              ))}
            </Grid>
          </StyledServicesContainer>
        </>
      )}
    </DialogWrapper>
  );
}

export default SelectApprovalHierarchy;
