import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProfileNav = styled("div")(({ theme }) => ({
  background: "#F5F5F5",
  display: "flex",
  justifyContent: "center",
  gap: 30,
}));

export const ProfileNavItem = styled(Typography)<{ active: boolean }>(
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
