import { Grid } from "@mui/material";
import { getForm, updatePage } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import FormAppbar from "layout/primarylayout/app-bar/FormAppbar";
import { DragDropContext } from "react-beautiful-dnd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  moveFields,
  selectForms,
  setAddPageOpen,
  setData,
  setFields,
} from "redux/reducers/formsSlice";
import { ResType } from "types";
import Fields from "views/forms/fields";
import AddPage from "views/forms/pages/AddPage";
import EditPage from "views/forms/pages/EditPage";
import Pages from "../../views/forms/pages";
import { reorder } from "views/taskboard/board/utils";
import availableFields from "views/forms/utils/availableFields";
import { prepareField } from "views/forms/utils/prepareField";

const FormBuilder = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { data, activePage } = useSelector(selectForms);
  const queryClient = useQueryClient();
  const snack = useSnack();

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

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Page fields added");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (destination.droppableId === "formbuilder-available-fields") return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      let reordered = reorder(
        data?.pages[activePage]?.fields,
        source.index,
        destination.index
      );
      dispatch(
        moveFields({
          from: source.index,
          to: destination.index,
        })
      );
      updatePageFields({
        formId: params.formId,
        pageId: data.pages[activePage]?._id,
        data: {
          fields: reordered,
        },
      });
    } else {
      let fields = [...data?.pages[activePage]?.fields];
      let newField = prepareField(availableFields[source.index]);
      fields.splice(destination.index, 0, newField);

      dispatch(setFields(fields));

      updatePageFields({
        formId: params.formId,
        pageId: data.pages[activePage]?._id,
        data: {
          fields,
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {data?.type === "TEMPLATE" && <FormAppbar />}
      {data?.pages?.length > 0 ? (
        <Grid container spacing={2} sx={{ pb: 4, px: 2 }}>
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
      <EditPage />
    </DragDropContext>
  );
};

export default FormBuilder;
