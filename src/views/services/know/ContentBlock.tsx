import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactQuill from "lib/react-quill";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTextContent } from "redux/reducers/addServiceSlice";
import { ContentItem } from "redux/reducers/addServiceSlice/types";
import AccordionItem from "./AccordionItem";
import AddAccordionField from "./AddAccordionField";
import AddAccordionItem from "./AddAccordionItem";

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
  const [openAccordionItem, setOpenAccordionItem] = useState<boolean>(false);
  const [selectedAccordion, setSelectedAccordion] = useState<string>("");

  const handleAddTextField = () => {
    dispatch(addTextContent({ index }));
  };

  return (
    <Box mt={10}>
      <Typography mb={1} variant="body2" color="primary">
        {item.title}
      </Typography>
      <Box>
        {item.items.map((content, index) => {
          if (content.type === "text") {
            return (
              <Box mb={2}>
                <ReactQuill
                  onChange={(v: string) => console.log(v)}
                  id={item.id}
                  key={index}
                />
              </Box>
            );
          }
          return (
            <Box mb={2}>
              {content.items?.map((item) => (
                <AccordionItem data={item} key={item.id} />
              ))}
              <Box textAlign="right">
                <Button
                  onClick={() => {
                    setSelectedAccordion(selectedAccordion);
                    setOpenAccordionItem(true);
                  }}
                  color="primary"
                  variant="outlined"
                >
                  Add Item
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box display="flex" gap={2}>
        <Button
          onClick={handleAddTextField}
          color="secondary"
          startIcon={<Add />}
        >
          Add Text Content
        </Button>
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          startIcon={<Add />}
        >
          Add Accordion Content
        </Button>
      </Box>
      <AddAccordionField index={index} open={open} setOpen={setOpen} />
      <AddAccordionItem
        selectedAccordion={selectedAccordion}
        open={openAccordionItem}
        setOpen={setOpenAccordionItem}
      />
    </Box>
  );
}

export default ContentBlock;
