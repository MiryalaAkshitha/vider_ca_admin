import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledProfileNav = styled("div")(({ theme }) => ({
  background: "#F5F5F5",
  display: "flex",
  justifyContent: "center",
  gap: 30,
}));

export const StyledProfileNavItem = styled(Typography)<{ active: boolean }>(
  ({ theme, active }) => ({
    padding: "15px 0px",
    position: "relative",
    color: active ? "black" : "rgba(0,0,0,0.6)",
    cursor: "pointer",
    ...(active && {
      "&:before": {
        position: "absolute",
        content: "''",
        bottom: 0,
        width: "80%",
        left: "50%",
        transform: "translateX(-50%)",
        height: 2,
        background: theme.palette.primary.dark,
      },
    }),
  })
);

export const StyledFile = styled("div")<{ dragging: boolean }>(
  ({ dragging }) => ({
    border: `1px solid ${dragging ? "red" : "#DDDDDD"}`,
    borderRadius: "4px",
    overflow: "hidden",
  })
);

export const StyledFileTitle = styled(Typography)(() => ({
  flex: 1,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

export const StyledFolder = styled("div")<{
  dragging: boolean;
  dropping: boolean;
}>(({ dragging, dropping }) => ({
  border: `1px solid ${
    dragging ? "red" : dropping ? "#182F53" : "rgba(0,0,0,0.08)"
  }`,
  borderRadius: "10px",
  cursor: "pointer",
  display: "flex",
  gap: 10,
  alignItems: "center",
  backgroundColor: dropping ? "rgb(24, 47, 83, 0.2)" : "rgba(0,0,0,0.06)",
  padding: "15px 20px",
}));

export const StyledUploadStatusDrawer = styled("div")(() => ({
  borderTopLeftRadius: "4px",
  borderTopRightRadius: "4px",
  background: "white",
  width: "400px",
  border: "1px solid black",
  position: "fixed",
  left: 20,
  bottom: 0,
  zIndex: 500000,
}));

export const StyledProfileImageContainer = styled("div")(() => ({
  width: 70,
  height: 70,
  position: "relative",
  borderRadius: "50%",
}));

export const StyledProfileImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  objectFit: "cover",
}));

export const StyledProfileImageOverlay = styled("div")<{ hover: boolean }>(
  ({ hover }) => ({
    position: "absolute",
    right: 0,
    top: 0,
    width: "100%",
    opacity: hover ? 1 : 0,
    height: "100%",
    display: "flex",
    transition: "0.3s",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.6)",
    cursor: "pointer",
  })
);

export const StyledContactPerson = styled("div")(() => ({
  display: "flex",
  maxWidth: 700,
  width: "100%",
  gap: 10,
  border: "1px solid lightgrey",
  padding: "20px",
  justifyContent: "space-between",
  borderRadius: 4,
  alignItems: "center",
  marginTop: "10px",
}));

export const StyledRecurProfileContainer = styled("div")(() => ({
  display: "flex",
  maxWidth: 1300,
  margin: "auto",
  width: "100%",
  gap: 10,
  marginTop: 30,
  boxShadow: "0px 5px 15px #22222214",
  borderRadius: 10,
}));

export const StyledRecurItemsContainer = styled("div")(() => ({
  height: "80vh",
  overflowY: "auto",
  borderRight: "1px solid rgba(0,0,0,0.1)",
}));

export const StyledRecurTasksContainer = styled("div")(() => ({
  padding: 10,
  height: "80vh",
  overflowY: "auto",
}));

export const StyledRecurProfileItem = styled("div")<{
  active: boolean | undefined;
  last: boolean | undefined;
}>(({ active, last }) => ({
  cursor: "pointer",
  padding: "13px 10px",
  backgroundColor: active ? "rgb(24, 47, 83, 0.08)" : "white",
  borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.1)",
}));

export const StyledTaskSection = styled("div")(({ theme }) => ({
  padding: 30,
  paddingBottom: 50,
  borderBottom: "4px solid rgba(0,0,0,0.05)",
  position: "relative",
  overflow: "hidden",
}));

export const StyledLogHoursTopbar = styled("div")<{ active: 1 | 0 }>(
  ({ active }) => ({
    position: "absolute",
    left: 0,
    transition: "0.4s",
    top: active ? 0 : -100,
    width: "100%",
    background: "#ededed",
    padding: 15,
    zIndex: 100,
    display: "flex",
    gap: 10,
    justifyContent: "space-between",
  })
);
