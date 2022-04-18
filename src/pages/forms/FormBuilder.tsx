import { Grid } from "@mui/material";
import { getForm } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import FormAppbar from "layout/primarylayout/app-bar/FormAppbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectForms,
  setAddPageOpen,
  setData,
} from "redux/reducers/formsSlice";
import { ResType } from "types";
import Fields from "views/forms/fields";
import AddPage from "views/forms/pages/AddPage";
import Pages from "../../views/forms/pages";

const CreateForm = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(selectForms);

  const { isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm,
    {
      onSuccess: (res) => {
        dispatch(setData(res?.data));
      },
      cacheTime: 0,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <DndProvider backend={HTML5Backend}>
      <FormAppbar />
      {data?.pages?.length > 0 ? (
        <Grid container spacing={2} sx={{ pt: 10, pb: 4, px: 2 }}>
          <Grid item xs={7}>
            <Pages />
          </Grid>
          <Grid item xs={5}>
            <Fields />
          </Grid>
        </Grid>
      ) : (
        <EmptyPage
          title="There are no pages available"
          btnTitle="+ Add Page"
          btnAction={() => dispatch(setAddPageOpen(true))}
          desc="Click on add page to add a new page"
        />
      )}
      <AddPage />
    </DndProvider>
  );
};

export default CreateForm;
