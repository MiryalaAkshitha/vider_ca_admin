import { Grid } from "@mui/material";
import { getForm, updatePage } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import FormAppbar from "layout/primarylayout/app-bar/FormAppbar";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import Fields from "views/forms/fields";
import AddPage from "views/forms/pages/AddPage";
import { reorder } from "views/taskboard/board/utils";
import Pages from "../../views/forms/pages";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const CreateForm = () => {
  const params = useParams();

  const [pageOpen, setPageOpen] = useState(false);
  const [state, setState] = useState<any>({});
  const snack = useSnack();
  const [value, setValue] = useState(0);

  const { data, isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm,
    {
      onSuccess: (res) => {
        setState(res?.data);
      },
    }
  );

  const { mutate } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Fields reordered successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) return;

    if (source.index === destination.index) return;

    const ordered = reorder(
      state?.pages[value]?.fields,
      source.index,
      destination.index
    );

    let newState = { ...state };
    newState.pages[value].fields = ordered;

    setState(newState);

    mutate({
      formId: params.formId,
      pageId: state?.pages[value]?._id,
      data: {
        fields: ordered,
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <DndProvider backend={HTML5Backend}>
      <FormAppbar />
      {data?.data?.pages?.length > 0 ? (
        <Grid container spacing={2} sx={{ pt: 10, pb: 4, px: 2 }}>
          <Grid item xs={7}>
            <Pages
              value={value}
              setValue={setValue}
              data={state}
              setPageOpen={setPageOpen}
            />
          </Grid>
          <Grid item xs={5}>
            <Fields />
          </Grid>
        </Grid>
      ) : (
        <EmptyPage
          title="There are no pages available"
          btnTitle="+ Add Page"
          btnAction={() => setPageOpen(true)}
          desc="Click on add page to add a new page"
        />
      )}
      <AddPage open={pageOpen} setOpen={setPageOpen} />
    </DndProvider>
  );
};

export default CreateForm;
