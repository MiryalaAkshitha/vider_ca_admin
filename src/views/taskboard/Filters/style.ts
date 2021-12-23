import { styled, Typography } from "@mui/material";

export const StyledClientFilterItem = styled(Typography)<{ active: boolean }>(
  ({ active, theme }) => {
    return {
      position: "relative",
      transition: "all 0.3s",
      cursor: "pointer",
      "&:before": {
        transition: "all 0.3s",
        position: "absolute",
        content: "''",
        width: "60%",
        height: "3px",
        borderRadius: 20,
        transform: "translateX(-60%)",
        background: theme.palette.primary.main,
        left: "50%",
        bottom: -10,
        opacity: active ? 1 : 0,
      },
    };
  }
);
