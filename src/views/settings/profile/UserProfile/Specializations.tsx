import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import AddSpecification from "./AddSpecification";
import SectionWrapper from "./SectionWrapper";

const Specializations = ({ state, setState }) => {
  const [open, setOpen] = useState(false);

  return (
    <SectionWrapper title="Specializations">
      <>
        <Box display="flex" gap={2} flexWrap="wrap">
          {state?.specializations?.map((tag: any, index: number) => (
            <Box
              key={index}
              onClick={() => {
                setState({
                  ...state,
                  specializations: state.specializations.filter(
                    (item: any, i: number) => i !== index
                  ),
                });
              }}
              sx={{
                background: "#F5F5F5",
                borderRadius: 2,
                overflow: "hidden",
                py: 1,
                px: 2,
                minWidth: 80,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
              }}
            >
              <Typography variant="body2">{tag}</Typography>
              <Typography variant="body1">&times;</Typography>
            </Box>
          ))}
          <Button
            startIcon={<Add />}
            onClick={() => setOpen(true)}
            color="secondary"
          >
            Add Specialization
          </Button>
        </Box>
        <AddSpecification
          onAdd={(value) =>
            setState({
              ...state,
              specializations: [...state.specializations, value],
            })
          }
          open={open}
          setOpen={setOpen}
        />
      </>
    </SectionWrapper>
  );
};

export default Specializations;
