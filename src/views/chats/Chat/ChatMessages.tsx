import { Box, Divider, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectChats } from "redux/reducers/chatsSlice";
import { StyledDayDivider } from "../styles";
import Message from "./Message";

const ChatMessages = () => {
  const { messages } = useSelector(selectChats);
  const elementRef = useRef<HTMLDivElement | null>(null);

  let filtered = _.groupBy(messages, (message) => {
    return moment(message.createdAt).format("YYYY-MM-DD");
  });

  let sorted = Object.keys(filtered).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  const getDay = (date: string) => {
    return moment(date).calendar(null, {
      sameDay: "[Today]",
      lastDay: "[Yesterday]",
      nextDay: "DD/MM/YYYY",
      nextWeek: "DD/MM/YYYY",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
  };

  useEffect(() => {
    if (!elementRef.current) return;

    const config = {
      childList: true,
      subtree: true,
      attributes: true,
      CharacterData: true,
    };

    function elementScroll() {
      let elementScrollHeight = elementRef.current!.scrollHeight;
      elementRef.current!.scrollTo({
        top: elementScrollHeight,
      });
    }

    let images = elementRef.current!.querySelectorAll("img");

    if (!images.length) {
      elementScroll();
    } else {
      for (let i = 0; i < Array.from(images).length; i++) {
        images[i].addEventListener("load", () => {
          if (i !== images.length - 1) return;
          elementScroll();
        });
      }
    }

    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        elementScroll();

        mutation.addedNodes.forEach((node) => {
          let images = (node as HTMLElement).querySelectorAll("img");
          images.forEach((image) => {
            image.onload = () => {
              elementScroll();
            };
          });
        });
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(elementRef.current, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box ref={elementRef} sx={{ flex: 1, overflowY: "auto", px: 1, py: 2 }}>
      {sorted.map((key, index: number) => (
        <React.Fragment key={index}>
          <StyledDayDivider>
            <Divider />
            <Typography variant="caption">{getDay(key)}</Typography>
          </StyledDayDivider>
          {filtered[key]?.map((message: any, index: number) => {
            return <Message key={index} data={message} />;
          })}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ChatMessages;
