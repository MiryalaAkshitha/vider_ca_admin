import EmptyPage from "components/EmptyPage";
import { useNavigate } from "react-router-dom";
import InvoiceTable from "views/invoicing/billing/invoices/InvoicesTable";

const Invoices = () => {
  const navigate = useNavigate();

  const AddNewInvoice = () => {
    navigate("/invoicing/create-invoice");
  };

  return (
    <>
      {1 ? (
        <InvoiceTable />
      ) : (
        <EmptyPage
          title="There are no Invoices available"
          btnTitle="Add new Invoice"
          btnAction={AddNewInvoice}
          desc="Click on Add new Invoice to add an Invoice"
        />
      )}
    </>
  );
};
export default Invoices;