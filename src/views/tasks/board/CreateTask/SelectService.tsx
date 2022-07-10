import {
  Box,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getCategories } from "api/services/categories";
import { getServices } from "api/services/services";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import {
  StyledServiceDesc,
  StyledServiceItem,
  StyledServicesContainer,
} from "./styles";

interface Props extends DialogProps {
  setValue: any;
  watch: any;
}

function SelectService({ open, setOpen, setValue, watch }: Props) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
  });

  const { data, isLoading }: ResType = useQuery("services", getServices, {
    enabled: open,
  });

  const { data: categories, isLoading: categoriesLoading }: ResType = useQuery(
    "categories",
    getCategories,
    {
      enabled: open,
    }
  );

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

  const handleClick = (service: any) => {
    let feeAmount =
      watch("feeType") === "HOURLY"
        ? service?.hourlyPrice
        : service?.totalPrice;
    setValue("service", service);
    setValue("feeAmount", feeAmount || "");
    setOpen(false);
  };

  return (
    <DialogWrapper
      width="lg"
      open={open}
      setOpen={setOpen}
      title="Select Service"
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
                  <StyledServiceItem onClick={() => handleClick(item)}>
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

export default SelectService;
