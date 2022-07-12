import { Button, styled, Typography } from "@mui/material";

export const StyledTasksFilterContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  background: "#F5F5F5",
  marginTop: "-16px",
  marginLeft: "-16px",
  marginRight: "-16px",
  padding: "10px 20px",
}));

export const StyledClientFilterItem = styled(Typography)<{ active: number }>(
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

export const StyledMoreHorButton = styled(Button)(({ theme }) => ({
  background: "white",
  minWidth: 0,
  p: 0,
  px: 1,
  height: "20px",
  border: "1px solid lightgrey",
  color: "rgba(0,0,0,0.5)",
  marginTop: 5,
}));

export const StyledAppliedFilterItem = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 10,
  background: "white",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "4px",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  padding: "5px 8px",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
}));
