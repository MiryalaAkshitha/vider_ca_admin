import { Box, Typography } from "@mui/material";
import SectionWrapper from "./SectionWrapper";

const Specializations = ({ data }) => {
  return (
    <SectionWrapper title="Specializations">
      <Box p={2} display="flex" gap={2} flexWrap="wrap">
        <>
          {data?.specializations?.length ? (
            data.specializations.map((tag: string, index: number) => (
              <Box
                key={index}
                sx={{
                  background: "#F5F5F5",
                  borderRadius: 2,
                  overflow: "hidden",
                  py: 1,
                  px: 2,
                  minWidth: 80,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">{tag}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No Specifications</Typography>
          )}
        </>
      </Box>
    </SectionWrapper>
  );
};

export default Specializations;
