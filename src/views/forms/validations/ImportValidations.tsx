import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  getDefaultFormValidations,
  importFormValidations,
} from "api/services/forms";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import {
  StyledServiceItem,
  StyledServicesContainer,
} from "views/tasks/board/CreateTask/styles";

interface Props extends DialogProps {
  successCb?: () => void;
}

function ImportValidations({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const { data, isLoading }: ResType = useQuery(
    "default-validations",
    getDefaultFormValidations,
    {
      enabled: open,
    }
  );

  const filteredData = useFilteredData(data?.data, ["name"], search);

  const { mutate } = useMutation(importFormValidations, {
    onSuccess: () => {
      queryClient.invalidateQueries("form-validations");
      setOpen(false);
      setSelected([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response?.data?.message);
    },
  });

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSubmit = () => {
    mutate({
      validations: selected,
    });
  };

  return (
    <DialogWrapper
      width="lg"
      open={open}
      setOpen={setOpen}
      title="Import Validations"
    >
      <Box display="flex" justifyContent="flex-end">
        <SearchContainer
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
                        checked={selected.includes(item?._id)}
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
              disabled={selected.length === 0}
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

export default ImportValidations;
