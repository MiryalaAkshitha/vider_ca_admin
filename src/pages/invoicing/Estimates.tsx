import EmptyPage from "components/EmptyPage";
import { useNavigate } from "react-router-dom";
import EstimatesTable from "views/invoicing/billing/Estimates/EstimatesTable";

const Estimates = () => {
  const navigate = useNavigate();

  const handleAddNewEstimate = () => {
    navigate("/invoicing/create-estimate");
  };

  return (
    <>
      {1 ? (
        <EstimatesTable />
      ) : (
        <EmptyPage
          title="There are no Estimate available"
          btnTitle="Add new estimate"
          btnAction={handleAddNewEstimate}
          desc="Click on Add new estimate to add an estimate"
        />
      )}
    </>
  );
};
export default Estimates;
