import { Box, Typography } from "@mui/material";
import { StyledField } from "../styles";
import { ItemTypes } from "../utils/itemTypes";
import { useDrag } from "react-dnd";

function Field({ item, handleOpen }: any) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { ...item },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();
      if (item && dropResult) {
        alert(
          `You dropped ${JSON.stringify(item?.type)} into ${dropResult.name}!`
        );
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <StyledField
      isDragging={isDragging ? 1 : 0}
      ref={drag}
      onClick={() => handleOpen(item)}
    >
      <Box>
        <img src={item.icon} alt={item.title} width={20} height={20} />
      </Box>
      <Typography variant="caption">{item.title}</Typography>
    </StyledField>
  );
}

export default Field;
