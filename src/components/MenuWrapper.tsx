import { Menu, PopoverOrigin } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type PositionTypes = "bottom-right" | "bottom-left" | "top-right" | "top-left";

interface IMenuWrapperProps {
  children: React.ReactNode;
  anchorEl: null | HTMLElement;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  type: PositionTypes;
}

function MenuWrapper(props: IMenuWrapperProps) {
  const { children, anchorEl, setAnchorEl, type } = props;

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      onClick={() => setAnchorEl(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          transform: "translateY(-10px)",
          minWidth: 200,
          py: 1,
        },
      }}
      transformOrigin={getTransForms(type)}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {children}
    </Menu>
  );
}

const getTransForms = (type: PositionTypes): PopoverOrigin => {
  if (type === "bottom-right") {
    return { horizontal: "right", vertical: "bottom" };
  }
  if (type === "top-right") {
    return { horizontal: "right", vertical: "top" };
  }
  return { horizontal: "right", vertical: "bottom" };
};

export default MenuWrapper;
