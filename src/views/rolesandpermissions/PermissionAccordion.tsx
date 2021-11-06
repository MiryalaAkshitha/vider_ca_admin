import { ExpandMore } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Switch from "@mui/material/Switch";
import { useState } from "react";

interface IPermissionAccordion {
  permissions: number[];
  handlePermissionChange: (id: number) => void;
  item: any;
}

const PermissonsAccordion = (props: IPermissionAccordion) => {
  const { permissions, handlePermissionChange, item } = props;
  const [open, setOpen] = useState<boolean>(true);

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="body1" sx={{ width: "33%", flexShrink: 0 }}>
          {item?.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {item?.children?.map((item, index) => (
          <Grid
            sx={{
              borderBottom: "1px dashed rgba(0,0,0,0.1)",
              marginBottom: "20px",
            }}
            container
            spacing={2}
            key={index}
          >
            <Grid item xs={5}>
              <Typography variant="body2">{item?.name}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Switch
                onChange={() => handlePermissionChange(item.id)}
                checked={permissions.includes(item?.id)}
              />
            </Grid>
          </Grid>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default PermissonsAccordion;
