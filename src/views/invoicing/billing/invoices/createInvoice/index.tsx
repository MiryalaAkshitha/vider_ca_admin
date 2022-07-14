import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getClients } from "api/services/clients/clients";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClientChange,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";
import { ResType } from "types";
import Addresses from "./Addresses";
import BankDetails from "./BankDetails";
import BottomBar from "./BottomBar";
import DraggableListItems from "./DraggableListItems";
import InvoiceDetails from "./InvoiceDetails";
import InvoiceHeadings from "./InvoiceHeadings";
import OtherParticulars from "./OtherParticulars";
import Particulars from "./Particulars";

const CreateInvoice = () => {
  const { client } = useSelector(selectInvoice);
  const dispatch = useDispatch();

  const { data, isLoading }: ResType = useQuery(["clients", {}], getClients);

  useTitle("New Invoice");

  if (isLoading) return <Loader />;

  return (
    <>
      <Box maxWidth={1500} margin="auto" p={2}>
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
            }}
          >
            INVOICE
          </Typography>
        </Box>
        <Box maxWidth={600}>
          <FormControl size="small" fullWidth>
            <InputLabel id="invoiceCustomer">Select Billing Entity</InputLabel>
            <Select
              labelId="invoiceCustomer"
              id="invoiceCustomer"
              value={client}
              label="SelectBillingEntity"
              defaultValue="customer1"
              onChange={(e) => {
                let client = data.data?.result?.find(
                  (client: any) => client.id === e.target.value
                );
                dispatch(
                  handleClientChange({
                    client,
                  })
                );
              }}
            >
              {data?.data?.result?.map((client: any, index: number) => (
                <MenuItem value={client?.id} key={index}>
                  {client?.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box maxWidth={600} sx={{ mt: "25px" }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="invoiceCustomer">Select Client</InputLabel>
            <Select
              labelId="invoiceCustomer"
              id="invoiceCustomer"
              value={client}
              label="Customer"
              defaultValue="customer1"
              onChange={(e) => {
                let client = data.data?.result?.find(
                  (client: any) => client.id === e.target.value
                );
                dispatch(
                  handleClientChange({
                    client,
                  })
                );
              }}
            >
              {data?.data?.result?.map((client: any, index: number) => (
                <MenuItem value={client?.id} key={index}>
                  {client?.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Addresses />
        <InvoiceDetails />
        <Particulars />
        <OtherParticulars />
        <BankDetails />
        <Box mt={3}>
          <InvoiceHeadings title="Terms & Conditions" />
          <Grid container columnSpacing={3}>
            <Grid item xs={8}>
              <DraggableListItems />
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ padding: "20px 0" }}>
                <Typography>Signature / Digital Signature</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ margin: "50px 0 100px 0" }}>
          <Typography sx={{ textAlign: "center" }}>
            For any enquiry, reach out via email viderbusiness@gmail.com or call
            on +91 81211 81212
          </Typography>
        </Box>
      </Box>
      <BottomBar />
    </>
  );
};

export default CreateInvoice;
