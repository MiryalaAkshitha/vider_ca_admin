import { Add, Delete, Edit, MoreVert, PlayArrow } from "@mui/icons-material";
import { Box, Button, IconButton, Tab, Tabs } from "@mui/material";
import { deletePage } from "api/services/forms";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import useSnack from "hooks/useSnack";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectForms,
  setActivePage,
  setAddPageOpen,
  setEditPageOpen,
} from "redux/reducers/formsSlice";

function PagesHeader() {
  const menu = useMenu();
  const snack = useSnack();
  const queryClient = useQueryClient();
  const params = useParams();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const { activePage, data } = useSelector(selectForms);

  const { mutate: pageDelete } = useMutation(deletePage, {
    onSuccess: () => {
      snack.success("Page deleted");
      dispatch(setActivePage(0));
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this page?",
      action: () => {
        pageDelete({
          formId: params.formId,
          pageId: data?.pages[activePage]?._id,
        });
      },
    });
  };

  const handleMenu = (e: MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Add Page",
          icon: <Add fontSize="small" color="secondary" />,
          action: () => dispatch(setAddPageOpen(true)),
        },
        {
          label: "Edit Page",
          icon: <Edit fontSize="small" color="secondary" />,
          action: () => dispatch(setEditPageOpen(true)),
        },
        {
          label: "Delete Page",
          icon: <Delete fontSize="small" color="secondary" />,
          action: handleDelete,
        },
      ],
    });
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" gap={2} pt={2} pr={1}>
        <a
          rel="noopener noreferrer"
          href={`/forms/access/${data._id}/?preview=true`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Button startIcon={<PlayArrow />} color="secondary">
            Preview
          </Button>
        </a>
        <IconButton onClick={handleMenu} color="secondary">
          <MoreVert />
        </IconButton>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activePage}
          onChange={(e, val) => dispatch(setActivePage(val))}
          aria-label="basic tabs example"
        >
          {data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?._id} />
          ))}
        </Tabs>
      </Box>
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default PagesHeader;
