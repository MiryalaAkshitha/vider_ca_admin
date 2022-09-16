import { Checkbox, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/services/categories";
import Loader from "components/Loader";
import ReactQuill from "lib/react-quill";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addServiceState, handleChange } from "redux/reducers/addServiceSlice";
import { ResType } from "types";

function BasicDetails() {
  const dispatch = useDispatch();
  const [hourlyPrice, setHourlyPrice] = useState(true);
  const [totalPrice, setTotalPrice] = useState(true);
  const state = useSelector(addServiceState);

  const { data, isLoading }: ResType = useQuery("categories", getCategories);

  const subCategories = data?.data?.find((item: any) => item.id === state.category)?.subCategories;

  const onChange = (e: any) => {
    dispatch(
      handleChange({
        name: e.target.name,
        value: e.target.value,
      })
    );

    if (e.target.name === "category") {
      dispatch(
        handleChange({
          name: "subCategory",
          value: "",
        })
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box mt={4} width="80%">
        <Typography variant="subtitle1" color="primary">
          Basic Details
        </Typography>
        <Box mt={2}>
          <Typography mb={1} variant="body2" color="primary">
            Select Category
          </Typography>
          <TextField
            name="category"
            value={state.category}
            onChange={onChange}
            fullWidth
            size="small"
            select
          >
            {data?.data.map((option: any, index: any) => (
              <MenuItem key={index} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        {subCategories?.length > 0 && (
          <Box mt={3}>
            <Typography mb={1} variant="body2" color="primary">
              Select Sub Category
            </Typography>
            <TextField
              value={state.subCategory}
              name="subCategory"
              onChange={onChange}
              fullWidth
              size="small"
              select
            >
              {subCategories?.map((option: any, index: any) => (
                <MenuItem key={index} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
        <Box mt={3}>
          <Typography mb={1} variant="body2" color="primary">
            Service Name
          </Typography>
          <TextField
            value={state.name}
            name="name"
            onChange={onChange}
            fullWidth
            placeholder="Enter Service Name"
            size="small"
          />
        </Box>
        <Box mt={3}>
          <Typography mb={1} variant="body2" color="primary">
            Price
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                label="Hourly Price"
                control={
                  <Checkbox checked={hourlyPrice} onChange={() => setHourlyPrice(!hourlyPrice)} />
                }
              />
              {hourlyPrice && (
                <TextField
                  value={state.hourlyPrice}
                  name="hourlyPrice"
                  onChange={onChange}
                  sx={{ mt: 1 }}
                  placeholder="Hourly Price"
                  type="number"
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                label="Total Price"
                control={
                  <Checkbox checked={totalPrice} onChange={() => setTotalPrice(!totalPrice)} />
                }
              />
              {totalPrice && (
                <TextField
                  value={state.totalPrice}
                  sx={{ mt: 1 }}
                  name="totalPrice"
                  onChange={onChange}
                  placeholder="Total Price"
                  type="number"
                  fullWidth
                  size="small"
                />
              )}
            </Grid>
          </Grid>
        </Box>
        <Box mt={3}>
          <Typography mb={1} variant="body2" color="primary">
            Description
          </Typography>
          <ReactQuill
            value={state.description}
            onChange={(v: string) => {
              dispatch(
                handleChange({
                  name: "description",
                  value: v,
                })
              );
            }}
            id="BasicDetails"
          />
        </Box>
      </Box>
    </>
  );
}

export default BasicDetails;
