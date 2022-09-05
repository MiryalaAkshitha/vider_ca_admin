import { Box, List } from "@mui/material";
import { communicationMenu } from "data/communicationMenu";
import CollapsibleMenuItem from "./CollapsibleMenuItem";
import SingleMenuItem from "./SingleMenuItem";

const SideNav = () => {
  return (
    <Box
      sx={{
        width: 200,
        borderRight: "1px solid #e0e0e0",
        minHeight: 550,
      }}
    >
      <List>
        {communicationMenu.map((item, index) => {
          return item?.children ? (
            <CollapsibleMenuItem key={index} item={item} />
          ) : (
            <SingleMenuItem item={item} key={index} />
          );
        })}
      </List>
    </Box>
  );
};
export default SideNav;
