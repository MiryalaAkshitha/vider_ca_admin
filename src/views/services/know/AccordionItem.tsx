import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Box } from "@mui/system";
import { Item } from "redux/reducers/addServiceSlice/types";

type AccordionProps = {
  data: Item;
};

const AccordionItem = ({ data }: AccordionProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'>
        <Typography>{data.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {data.description ? (
          <Typography>{data.description}</Typography>
        ) : (
          <>
            <Button variant='outlined' color='primary' size='small'>
              Add Item
            </Button>
            {data.items?.map((item) => (
              <Box mt={2} key={item.id}>
                <AccordionItem data={item} />
              </Box>
            ))}
          </>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
