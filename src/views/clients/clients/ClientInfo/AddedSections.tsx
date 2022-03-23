import { Box, Divider, List, ListItemButton, Typography } from "@mui/material";
import { Fragment } from "react";

function AddedSections({ selectedForm, setSelectedForm, data }) {
  return (
    <>
      {data?.length > 0 && (
        <>
          <Typography color="primary" variant="subtitle2">
            Added sections
          </Typography>
          <Box mt={1} bgcolor="rgba(24, 47, 83, 0.06)">
            <List sx={{ p: 2 }}>
              {data?.map((item: any, index: number) => (
                <Fragment key={index}>
                  <ListItemButton
                    onClick={() => setSelectedForm(item)}
                    selected={item?.id === selectedForm?.id}
                    sx={{ py: "12px" }}
                  >
                    <Typography color="primary" variant="body1">
                      + {item?.name}
                    </Typography>
                  </ListItemButton>
                  {index !== data?.length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          </Box>
        </>
      )}
    </>
  );
}
export default AddedSections;
