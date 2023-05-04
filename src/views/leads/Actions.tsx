import { Edit, InfoOutlined } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import ConverLead from "views/leads/ConvertLead";
import EditLead from "views/leads/EditLead";
import ViewLead from "views/leads/ViewLead";
import { Visibility } from "@mui/icons-material";

const Actions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <>
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          onClick={() => {
            setSelectedLead(data);
            setInfoOpen(true);
          }}
        >
           <Visibility />
        </IconButton>
        {data?.status === "PENDING" && (
          <IconButton
            size="small"
            onClick={() => {
              setSelectedLead(data);
              setOpen(true);
            }}
          >
            <Edit />
          </IconButton>
        )}
        <Button
          disabled={data?.status === "CONVERTED"}
          onClick={() => {
            setSelectedLead(data);
            setConvertOpen(true);
          }}
          sx={{ minWidth: 80 }}
          color="secondary"
        >
          {data?.status === "PENDING" ? "Convert" : "Converted"}
        </Button>
      </Box>
      <EditLead open={open} setOpen={setOpen} data={selectedLead} />
      <ConverLead open={convertOpen} setOpen={setConvertOpen} data={selectedLead} />
      <ViewLead open={infoOpen} setOpen={setInfoOpen} data={selectedLead} />
    </>
  );
};

export default Actions;
