import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledProfileNav = styled("div")(({ theme }) => ({
  background: "#F5F5F5",
  display: "flex",
  justifyContent: "center",
  gap: 30,
}));

export const StyledProfileNavItem = styled(Typography)<{ active: number }>(
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

export const StyledFile = styled("div")<{ dragging: number }>(
  ({ dragging }) => ({
    border: `1px solid ${dragging ? "red" : "#DDDDDD"}`,
    borderRadius: "4px",
    overflow: "hidden",
  })
);

export const StyledFileTitle = styled(Typography)(() => ({
  flex: 1,
  overflow: "hidden",
  width: "100%",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
}));

export const StyledFolder = styled("div")<{
  dragging: number;
  dropping: number;
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
  position: "relative",
  display: "inline-flex",
}));

export const StyledProfileImage = styled("img")(() => ({
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
}));

export const StyledOrganizationImageContainer = styled("div")(() => ({
  width: 70,
  height: 70,
  position: "relative",
}));

export const StyledOrganizationImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

export const StyledOrganizationImageOverlay = styled("div")<{ hover: boolean }>(
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
    background: "rgba(0,0,0,0.6)",
    cursor: "pointer",
  })
);

export const StyledProfileImageOverlay = styled("div")<{ hover: number }>(
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
  gap: 20,
  border: "1px solid lightgrey",
  padding: "20px 10px",
  paddingTop: 30,
  justifyContent: "space-between",
  borderRadius: 4,
  alignItems: "center",
  marginTop: "10px",
  position: "relative",
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
  active: number | undefined;
  last: number | undefined;
}>(({ active, last }) => ({
  cursor: "pointer",
  padding: "13px 10px",
  backgroundColor: active ? "rgb(24, 47, 83, 0.08)" : "white",
  borderBottom: last ? "none" : "1px solid rgba(0,0,0,0.1)",
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
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

export const StyledSearchList = styled(Paper)(() => ({
  width: "100%",
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  position: "absolute",
  top: "100%",
  left: 0,
  minHeight: "200px",
  maxHeight: "400px",
  overflowY: "auto",
  zIndex: 1,
}));

export const StyledTimelineIcon = styled("div")(() => ({
  background: "#0D47A11A",
  padding: "10px 20px",
  width: 240,
  position: "relative",
  "&:before": {
    content: "''",
    position: "absolute",
    bottom: 0,
    width: 0,
    height: 0,
    left: "100%",
    borderLeft: "20px solid #0D47A11A",
    borderTop: "35px solid transparent",
    borderBottom: "35px solid transparent",
  },
}));
