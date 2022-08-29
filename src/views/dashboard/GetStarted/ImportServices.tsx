import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getCategories } from "api/services/categories";
import { getDefaultServices, importServices } from "api/services/services";
import DialogWrapper from "components/DialogWrapper";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";
import {
  StyledServiceDesc,
  StyledServiceItem,
  StyledServicesContainer,
} from "views/tasks/board/CreateTask/styles";

interface Props extends DialogProps {
  successCb?: () => void;
}

function ImportServices({ open, setOpen, successCb }: Props) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({
    category: null,
    subCategory: null,
  });
  const [data, setData] = useState<any>([]);
  const [clicked, setClicked] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setData([]);
    setPage(1);
  }, [open]);

  const { isLoading }: ResType = useQuery(
    [
      "default-services",
      {
        search,
        limit,
        offset,
        ...filters,
      },
    ],
    getDefaultServices,
    {
      enabled: open,
      onSuccess: (res: any) => {
        if (clicked) {
          setData([...data, ...res.data.result]);
          setClicked(false);
        } else {
          setData(res.data.result);
        }
      },
    }
  );

  const { data: categories }: ResType = useQuery("categories", getCategories, {
    enabled: open,
  });

  const { mutate, isLoading: importLoading } = useMutation(importServices, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setOpen(false);
      setSelectAll(false);
      setSelectedServices([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response?.data?.message);
    },
  });

  const subCategories = categories?.data?.find(
    (item: any) => item.id === +filters.category
  )?.subCategories;

  const handleChange = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((item) => item !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleCategoryChange = (e: any) => {
    setFilters({
      ...filters,
      category: e.target.value,
      subCategory: null,
    });
    setPage(1);
  };

  const handleSubCategoryChange = (e: any) => {
    setFilters({
      ...filters,
      subCategory: e.target.value,
    });
    setPage(1);
  };

  const handleSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
  };

  const handleSubmit = () => {
    mutate({
      services: selectedServices,
      selectAll,
    });
  };

  return (
    <DialogWrapper width="lg" open={open} setOpen={setOpen} title="Import Services">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1}>
          <TextField
            label="Select Category"
            value={filters.category}
            sx={{ width: 200 }}
            onChange={handleCategoryChange}
            size="small"
            select
          >
            {categories?.data.map((option: any, index: any) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          {subCategories?.length > 0 && (
            <TextField
              sx={{ width: 200 }}
              value={filters.subCategory}
              label="Select Subcategory"
              onChange={handleSubCategoryChange}
              size="small"
              select
            >
              {subCategories?.map((option: any, index: any) => (
                <MenuItem key={index} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Box>
        <Box display="flex" gap={1}>
          <FormControlLabel
            label="Select All"
            control={<Checkbox checked={selectAll} onChange={handleSelectAll} />}
          />
          <SearchContainer
            value={search}
            onChange={(v: string) => {
              setSearch(v);
              setPage(1);
            }}
            debounced
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <StyledServicesContainer>
        <Grid container spacing={2}>
          {data?.map((item: any, index: number) => (
            <Grid item xs={4} key={index}>
              <StyledServiceItem>
                <Box>
                  <Typography variant="caption" color="rgba(0,0,0,0.6)">
                    {item?.category?.name} {item?.subCategory && `-- ${item?.subCategory?.name}`}
                  </Typography>
                  <Typography variant="subtitle2">{item?.name}</Typography>
                  <Typography color="rgba(0,0,0,0.6)" variant="body2">
                    <StyledServiceDesc
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    ></StyledServiceDesc>
                  </Typography>
                </Box>
                <Box>
                  <Checkbox
                    onChange={() => handleChange(item?.id)}
                    checked={selectedServices.includes(item?.id) || selectAll}
                  />
                </Box>
              </StyledServiceItem>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: "center", pt: 2 }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              {data?.length > 0 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setClicked(true);
                    setPage((page) => page + 1);
                  }}
                >
                  Load More
                </Button>
              )}
            </>
          )}
        </Box>
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
        <Button
          sx={{ minWidth: 300 }}
          disabled={selectedServices.length === 0 && !selectAll}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
          size="large"
        >
          {importLoading ? <CircularProgress size="small" sx={{ color: "white" }} /> : "Import"}
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default ImportServices;
