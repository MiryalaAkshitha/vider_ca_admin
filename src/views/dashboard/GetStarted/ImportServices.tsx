import {
  Box,
  Button,
  Checkbox,
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
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { snack } from "components/toast";
import { useState } from "react";
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
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
  });

  const { data, isLoading }: ResType = useQuery(
    "default-services",
    getDefaultServices,
    {
      enabled: open,
    }
  );

  const { data: categories, isLoading: categoriesLoading }: ResType = useQuery(
    "categories",
    getCategories,
    {
      enabled: open,
    }
  );

  const { mutate } = useMutation(importServices, {
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

  function getData() {
    const { category, subCategory } = filters;
    let result = data?.data ? [...data?.data] : [];

    if (search) {
      result = result?.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result?.filter((item) => item.category?.id === +category);
    }

    if (subCategory) {
      result = result?.filter((item) => item.subCategory?.id === +subCategory);
    }

    return result;
  }

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

  const handleSelectAll = (e: any) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      let allServices = data?.data.map((item: any) => item._id);
      setSelectedServices(allServices);
    } else {
      setSelectedServices([]);
    }
  };

  const handleSubmit = () => {
    mutate({
      services: selectedServices,
    });
  };

  return (
    <DialogWrapper
      width="lg"
      open={open}
      setOpen={setOpen}
      title="Import Services"
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={1}>
          <TextField
            label="Select Category"
            value={filters.category}
            sx={{
              width: 200,
            }}
            onChange={(e: any) => {
              setFilters({
                ...filters,
                category: e.target.value,
                subCategory: "",
              });
            }}
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
              sx={{
                width: 200,
              }}
              value={filters.subCategory}
              label="Select Subcategory"
              onChange={(e: any) => {
                setFilters({
                  ...filters,
                  subCategory: e.target.value,
                });
              }}
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
            control={
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            }
          />
          <SearchContainer
            placeHolder="Search"
            minWidth="300px"
            onChange={setSearch}
          />
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      {isLoading || categoriesLoading ? (
        <Loader />
      ) : (
        <>
          <StyledServicesContainer>
            <Grid container spacing={2}>
              {getData()?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <StyledServiceItem>
                    <Box>
                      <Typography variant="caption" color="rgba(0,0,0,0.6)">
                        {item?.category?.name}{" "}
                        {item?.subCategory && `-- ${item?.subCategory?.name}`}
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
                        checked={selectedServices.includes(item?.id)}
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
              disabled={selectedServices.length === 0}
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

export default ImportServices;
