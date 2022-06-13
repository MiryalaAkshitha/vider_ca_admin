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
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { DialogProps, ResType } from "types";

interface Props extends DialogProps {
  successCb: () => void;
}

function SelectServices({ open, setOpen, successCb }: Props) {
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
      setOpen(false);
      setSelectAll(false);
      setSelectedServices([]);
      successCb && successCb();
    },
    onError: (err: any) => {
      snack.error(err.response?.data?.message);
    },
  });

  const filteredData = useFilteredData(
    data?.data,
    ["name", "category", "subCategory"],
    search
  );

  const subCategories = categories?.data?.find(
    (item: any) => item.id === filters.category
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
      title="Select Services"
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
            placeHolder="Search by category or name"
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
          <Box
            sx={{
              height: 400,
              overflow: "auto",
              mx: -2,
              px: 2,
              mt: 2,
            }}
          >
            <Grid container spacing={2}>
              {filteredData?.map((item: any, index: number) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      height: "100%",
                      border: "1px solid rgba(0,0,0,0.3)",
                      borderRadius: 1,
                      mb: "10px",
                      px: 1,
                      py: "4px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="caption" color="rgba(0,0,0,0.6)">
                        {item?.category}{" "}
                        {item?.subCategory && `-- ${item?.subCategory}`}
                      </Typography>
                      <Typography variant="subtitle2">{item?.name}</Typography>
                      <Typography color="rgba(0,0,0,0.6)" variant="body2">
                        <div
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            lineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        ></div>
                      </Typography>
                    </Box>
                    <Box>
                      <Checkbox
                        onChange={() => handleChange(item?._id)}
                        checked={selectedServices.includes(item?._id)}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
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

export default SelectServices;
