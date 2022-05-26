import { ListItemButton, styled } from "@mui/material";

export const StyledChatsWrapper = styled("div")(() => ({
  position: "fixed",
  left: 110,
  bottom: 45,
  display: "flex",
  gap: 10,
}));

export const StyledRecentChatsContainer = styled("div")(() => ({
  background: "white",
  borderRadius: 10,
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  width: 400,
  minHeight: 400,
  maxHeight: 400,
  display: "flex",
  flexDirection: "column",
  border: "1px solid #e0e0e0",
  position: "relative",
  overflow: "hidden",
}));

export const StyledChatHeader = styled("div")(() => ({
  display: "flex",
  padding: "4px 10px",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
}));

export const StyledChatSearch = styled("input")(() => ({
  width: "100%",
  border: "none",
  outline: "none",
  height: 40,
  background: "#F5F5F5",
  padding: "5px 10px",
}));

export const StyledChatInput = styled("div")(() => ({
  position: "relative",
  "& input": {
    width: "100%",
    border: "none",
    outline: "none",
    height: 40,
    background: "#F5F5F5",
    padding: "5px 10px",
    paddingRight: 80,
  },
  "& div": {
    display: "flex",
    gap: 5,
    position: "absolute",
    top: "50%",
    right: 0,
    transform: "translateY(-50%)",
  },
}));

export const StyledDayDivider = styled("div")(() => ({
  width: "100%",
  position: "relative",
  marginTop: 30,
  marginBottom: 20,
  "& span": {
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "0px 10px",
  },
}));

export const StyledChatItem = styled(ListItemButton)<{ selected: 1 | 0 }>(
  ({ selected }) => ({
    position: "relative",
    "&:before": selected && {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "2px",
      background: "#2196f3",
      borderRadius: "2px",
    },
  })
);
