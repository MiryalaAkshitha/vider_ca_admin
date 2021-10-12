import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Editor from "components/Editor";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTextContent } from "redux/reducers/addServiceSlice";
import { ContentItem } from "redux/reducers/addServiceSlice/types";
import AddAccordionField from "./AddAccordionField";

type ContentBlockProps = {
  item: {
    title: string;
    id: string;
    items: Array<ContentItem>;
  };
  index: number;
};

function ContentBlock({ item, index }: ContentBlockProps) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleAddTextField = () => {
    dispatch(addTextContent({ index }));
  };

  return (
    <Box mt={3}>
      <Typography mb={1} variant='body2' color='primary'>
        {item.title}
      </Typography>
      <Box>
        {item.items.map((item, index) => {
          if (item.type === "text") {
            return (
              <Box mb={1}>
                <Editor key={index} />
              </Box>
            );
          }
        })}
      </Box>
      <Box display='flex' mt={1} gap={2}>
        <Button
          onClick={handleAddTextField}
          color='secondary'
          startIcon={<Add />}>
          Add Text Field
        </Button>
        <Button
          onClick={() => setOpen(true)}
          color='secondary'
          startIcon={<Add />}>
          Add Accordion Field
        </Button>
      </Box>
      <AddAccordionField index={index} open={open} setOpen={setOpen} />
    </Box>
  );
}

export default ContentBlock;
