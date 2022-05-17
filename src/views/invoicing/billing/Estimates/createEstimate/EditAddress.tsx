import { Autocomplete, Grid, TextField } from "@mui/material";
import { getStates } from "api/services/common";
import DialogWrapper from "components/DialogWrapper";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddressChange,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";
import { DialogProps, InputChangeType, ResType } from "types";

interface Props extends DialogProps {
  type: "billing" | "shipping";
}

const EditAddress = ({ open, setOpen, type }: Props) => {
  const { billingAddress, shippingAddress } = useSelector(selectInvoice);
  const dispatch = useDispatch();

  const { data, isLoading }: ResType = useQuery("states", getStates);

  function onChange(e: InputChangeType) {
    dispatch(
      handleAddressChange({
        type,
        key: e.target.name,
        value: e.target.value,
      })
    );
  }

  let address = type === "billing" ? billingAddress : shippingAddress;

  return (
    <>
      <DialogWrapper
        width="sm"
        title="Edit Address"
        open={open}
        setOpen={setOpen}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="Email"
                fullWidth
                name="email"
                onChange={onChange}
                size="small"
                value={address?.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Mobile Number"
                name="mobileNumber"
                onChange={onChange}
                fullWidth
                size="small"
                value={address?.mobileNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST Treatment"
                fullWidth
                name="gstTreatment"
                onChange={onChange}
                size="small"
                value={address?.gstTreatment}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GSTIN"
                name="gstIn"
                onChange={onChange}
                fullWidth
                size="small"
                value={address?.gstIn}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                fullWidth
                size="small"
                name="address"
                value={address?.address}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                size="small"
                name="city"
                fullWidth
                onChange={onChange}
                value={address?.city}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                onChange={(_, value) =>
                  dispatch(
                    handleAddressChange({
                      type,
                      key: "state",
                      value: value || "",
                    })
                  )
                }
                value={address?.state || ""}
                options={data?.data?.map((item) => item?.name) || []}
                getOptionLabel={(option: any) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    fullWidth
                    label="State"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Pincode"
                size="small"
                fullWidth
                name="pincode"
                value={address?.pincode}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        )}
      </DialogWrapper>
    </>
  );
};

export default EditAddress;
