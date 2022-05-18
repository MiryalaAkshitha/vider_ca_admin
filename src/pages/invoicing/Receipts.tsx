import EmptyPage from "components/EmptyPage";
import { useNavigate } from "react-router-dom";
import ReceiptsTable from "views/invoicing/billing/Receipts/ReceiptsTable";

const Receipts = () => {
    const navigate = useNavigate()

    const AddNewReceipts = () => {
        navigate("/invoicing/create-receipt")
    }

    return (
        <>
            {1 ? <ReceiptsTable /> : <EmptyPage
                title="There are no Receipts available"
                btnTitle="Add new Receipts"
                btnAction={AddNewReceipts}
                desc="Click on Add new Receipts to add an Receipts"
            />}
        </>
    );
}
export default Receipts