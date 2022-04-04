import useQueryParams from "hooks/useQueryParams";
import AddForm from "views/formbuilder/AddForm";
import EmptyPage from "components/EmptyPage";

const OrganisationForms = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <>
      <EmptyPage
        title="There are no forms available"
        btnTitle="Create Form"
        btnAction={() => {
          setQueryParams({
            ...queryParams,
            createForm: "true",
          });
        }}
        desc="Click on create form to add a new form"
      />
      <AddForm />
    </>
  );
};

export default OrganisationForms;
