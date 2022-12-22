import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { getDefaultCategories, importCategories } from "api/services/categories";
import { importServices } from "api/services/services";
import DialogWrapper from "components/DialogWrapper";
import LoadingButton from "components/LoadingButton";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import { MouseEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import { handleError } from "utils/handleError";
import { StyledServiceItem, StyledServicesContainer } from "views/tasks/board/CreateTask/styles";

interface Props extends DialogProps {
  successCb?: () => void;
}

function ImportCategories({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const { data }: ResType = useQuery("default-categories", getDefaultCategories, {
    enabled: open,
  });

  const { mutate, isLoading: importLoading } = useMutation(importCategories, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      setOpen(false);
      setSelectAll(false);
      setSelected([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleChange = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
  };

  const handleSubmit = () => {
    mutate({
      categories: selected,
      selectAll,
    });
  };

  return (
    <DialogWrapper
      width="lg"
      open={open}
      setOpen={setOpen}
      title="Import Categories
    "
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1}>
          <FormControlLabel
            label="Select All"
            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <StyledServicesContainer>
        <Grid container spacing={2}>
          {data?.data?.map((item: any, index: number) => (
            <Grid item xs={4} key={index}>
              <CategoryCard
                key={index}
                checked={selected.includes(item.id) || selectAll}
                onChange={() => handleChange(item.id)}
                data={item}
              />
            </Grid>
          ))}
        </Grid>
      </StyledServicesContainer>
      <Box
        sx={{
          textAlign: "center",
          background: "white",
          py: 2,
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          mx: -2,
          mb: -2,
        }}
      >
        <LoadingButton
          loading={importLoading}
          sx={{ minWidth: 300 }}
          disabled={selected.length === 0 && !selectAll}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          size="large"
          title="Import"
        />
      </Box>
    </DialogWrapper>
  );
}

function CategoryCard({ data, checked, onChange }: any) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          boxShadow: "0px 3px 12px #0000001A",
          borderRadius: 2,
        }}
      >
        <Box display="flex" p={2} gap={1} justifyContent="space-between">
          <Box display="flex" gap="4px">
            <Typography variant="subtitle2" color="primary">
              {data?.name}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            {data?.subCategories?.length ? (
              <IconButton onClick={() => setOpen(!open)}>
                <KeyboardArrowDownRoundedIcon />
              </IconButton>
            ) : null}
            <Checkbox onChange={() => onChange(data?.id)} checked={checked} />
          </Box>
        </Box>
        {data?.subCategories?.length && open ? (
          <>
            <Divider sx={{ my: 1 }} />
            <Box flexWrap="wrap" display="flex" p={2} gap={2}>
              {data.subCategories?.map((item: any, index: any) => (
                <Box
                  px="10px"
                  py="5px"
                  borderRadius={2}
                  key={index}
                  border="1px solid rgb(24, 47, 83, 0.2)"
                >
                  <Typography color="primary" variant="caption">
                    {item?.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        ) : null}
      </Box>
    </>
  );
}

export default ImportCategories;
