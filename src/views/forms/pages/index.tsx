import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectForms } from "redux/reducers/formsSlice";
import {
  StyledEmptyPagePlaceholder,
  StyledPagesContainer,
  StyledPagesDroppable,
} from "../styles";
import PageFieldItem from "./PageFieldItem";
import PagesHeader from "./PagesHeader";

function Pages() {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const didMountRef = useRef(false);
  const { activePage, data } = useSelector(selectForms);

  useEffect(() => {
    if (didMountRef.current) {
      if (!elementRef.current) return;

      // let elementScrollHeight = elementRef.current.scrollHeight;

      // window.scrollTo({
      //   top: elementScrollHeight,
      //   behavior: "smooth",
      // });
    }
    didMountRef.current = true;
  }, [data]);

  return (
    <StyledPagesContainer ref={elementRef}>
      <PagesHeader />
      <Box minHeight={500}>
        <Droppable droppableId="formbuilder-page-fields">
          {(provided: any, snapshot: any) => (
            <StyledPagesDroppable
              ref={(ref) => {
                provided.innerRef(ref);
              }}
            >
              {data?.pages[activePage]?.fields?.map((item: any) => (
                <PageFieldItem item={item} key={item?._id} index={item?._id} />
              ))}
              {provided.placeholder}
              {data?.pages[activePage]?.fields?.length === 0 &&
                !snapshot?.isDraggingOver && (
                  <StyledEmptyPagePlaceholder>
                    <Typography variant="subtitle2" gutterBottom>
                      Start creating
                    </Typography>
                    <Typography variant="body1" color="rgba(0,0,0,0.5)">
                      Drag and drop fields from the right panel to add them to
                      your form.
                    </Typography>
                  </StyledEmptyPagePlaceholder>
                )}
            </StyledPagesDroppable>
          )}
        </Droppable>
      </Box>
    </StyledPagesContainer>
  );
}

export default Pages;
