import { Box, Button, Checkbox, Divider, Grid, Typography } from "@mui/material";
import { getDefaultForms, getForms, importForms } from "api/services/forms";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import useFilteredData from "hooks/useFilteredData";
import { filter } from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { StyledServiceItem, StyledServicesContainer } from "views/tasks/board/CreateTask/styles";

interface Props extends DialogProps {
  successCb?: () => void;
  d?: any;
}

function ImportForms({ open, setOpen, successCb, d }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedForms, setSelectedForms] = useState<string[]>([]);

  const { data, isLoading }: ResType = useQuery("default-forms", getDefaultForms, {
    enabled: open,
  });

  const filteredData = useFilteredData(data?.data, ["name"], search);

  const { mutate } = useMutation(importForms, {
    onSuccess: () => {
      queryClient.invalidateQueries("forms");
      setOpen(false);
      setSelectedForms([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response?.data?.message);
    },
  });

  const handleChange = (id: string) => {
    if (selectedForms.includes(id)) {
      setSelectedForms(selectedForms.filter((item) => item !== id));
    } else {
      setSelectedForms([...selectedForms, id]);
    }
  };

  const handleSubmit = () => {
    mutate({
      forms: selectedForms,
    });
  };

  return (
    <DialogWrapper width="lg" open={open} setOpen={setOpen} title="Import forms">
      <Box display="flex" justifyContent="flex-end">
        <SearchContainer
          value={search}
          placeHolder="Search"
          minWidth="300px"
          onChange={setSearch}
        />
      </Box>
      <Divider sx={{ mt: 2 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Grid container spacing={2}>
              {filteredData?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <StyledServiceItem>
                    <Box>
                      <Typography variant="subtitle2">{item?.name}</Typography>
                      <Typography color="rgba(0,0,0,0.6)" variant="body2">
                        {item?.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        onChange={() => handleChange(item?._id)}
                        checked={selectedForms.includes(item?._id)}
                      />
                    </Box>
                  </StyledServiceItem>
                </Grid>
              ))}
            </Grid>
          </StyledServicesContainer>
          <Box
            sx={{
              textAlign: "center",
              background: "white",
            }}
          >
            <Button
              sx={{ minWidth: 300 }}
              disabled={selectedForms.length === 0}
              color="secondary"
              variant="contained"
              onClick={handleSubmit}
              size="large"
            >
              Submit
            </Button>
          </Box>
        </>
      )}
    </DialogWrapper>
  );
}

export default ImportForms;
