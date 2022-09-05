import { Box, List } from "@mui/material";
import { brodcastMenu } from "data/brodcastMenu";
import SingleMenuItem from "./sideNav/SingleMenuItem";
import CollapsibleMenuItem from "./sideNav/CollapsibleMenuItem";

function BrodcastSideNav() {
  return (
    <Box sx={{ width: 200, borderRight: "1px solid #e0e0e0", minHeight: 550 }}>
      <List>
        {brodcastMenu.map((item, index) => {
          return item?.children ? (
            <CollapsibleMenuItem key={index} item={item} />
          ) : (
            <SingleMenuItem item={item} key={index} />
          );
        })}
      </List>
    </Box>
  );
}

export default BrodcastSideNav;
