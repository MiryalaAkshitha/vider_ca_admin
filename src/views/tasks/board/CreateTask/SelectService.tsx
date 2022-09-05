import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { getCategories } from "api/services/categories";
import { getServices } from "api/services/services";
import DialogWrapper from "components/DialogWrapper";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import { StyledServiceDesc, StyledServiceItem, StyledServicesContainer } from "./styles";

interface Props extends DialogProps {
  setValue: any;
  watch: any;
}

function SelectService({ open, setOpen, setValue, watch }: Props) {
  const [filters, setFilters] = useState<any>({ category: null, subCategory: null });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const offset = (page - 1) * limit;
  const [data, setData] = useState<any>([]);
  const [clicked, setClicked] = useState(false);

  const { isLoading }: ResType = useQuery(
    ["services", { search, limit, offset, ...filters }],
    getServices,
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

  const subCategories = categories?.data?.find(
    (item: any) => item.id === +filters.category
  )?.subCategories;

  const handleCategoryChange = (e: any) => {
    setFilters({ ...filters, category: e.target.value, subCategory: null });
    setPage(1);
  };

  const handleSubCategoryChange = (e: any) => {
    setFilters({ ...filters, subCategory: e.target.value });
    setPage(1);
  };

  const handleClick = (service: any) => {
    let feeAmount = watch("feeType") === "HOURLY" ? service?.hourlyPrice : service?.totalPrice;
    setValue("service", service);
    setValue("feeAmount", feeAmount || "");
    setOpen(false);
  };

  return (
    <DialogWrapper width="lg" open={open} setOpen={setOpen} title="Select Service">
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
              <StyledServiceItem onClick={() => handleClick(item)}>
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
    </DialogWrapper>
  );
}

export default SelectService;
