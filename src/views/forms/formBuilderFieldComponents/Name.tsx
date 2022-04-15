import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Typography } from "@mui/material";
import Icon from "@mui/material/Icon";
import FormCheckbox from "components/FormFields/FormCheckbox";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormRadioAddable from "components/FormFields/FormRadioAddable";
import LoadingButton from "components/LoadingButton";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "views/taskboard/board/utils";

const Number = (props: any) => {
  const { control } = props;
  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState([
    {
      label: "Title",
      value: "title",
      isMandatory: false,
      isVisible: true,
    },
    {
      label: "First Name",
      value: "firstName",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "Middle Name",
      value: "middleName",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "Last Name",
      value: "lastName",
      isMandatory: true,
      isVisible: false,
    },
  ]);
  const titleElement = { label: "", value: "" };
  const [titleElements, setTitleElements] = useState([
    { label: "", value: "" },
  ]);

  const onAdd = () => {
    const newTitleElements = [...titleElements, titleElement];
    setTitleElements(newTitleElements);
  };

  const onDelete = (item, index) => {
    if (titleElements.length > 1) {
      const newTitleElements = titleElements.filter((_, idx) => idx !== index);
      setTitleElements(newTitleElements);
    }
  };

  const handleVisibility = (label) => {
    const newData = data.map((item) => {
      if (item.label === label) {
        return {
          ...item,
          isVisible: !item.isVisible,
        };
      }
      return item;
    });

    setData(newData);
  };

  const renderAdornment = ({ isVisible, label }) => {
    if (isVisible)
      return (
        <VisibilityIcon
          sx={{ cursor: "pointer" }}
          onClick={() => handleVisibility(label)}
        />
      );
    return (
      <VisibilityOffIcon
        sx={{ cursor: "pointer" }}
        onClick={() => handleVisibility(label)}
      />
    );
  };

  return (
    <>
      <Box mt={2}>
        <FormInput name="feildName" label="Feild Name" control={control} />
      </Box>
      <Box mt={2}>
        <FormInput
          name="fieldInstructions"
          label="Field Instructions"
          multiline
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldSize"
          label="Field Size"
          options={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ]}
        />
      </Box>
      <Box mt={2}>
        <FormInput
          name="placeHolderText"
          label="PlaceHolder Text"
          control={control}
        />
      </Box>
      <Box mt={2}>
        <FormRadio
          row
          control={control}
          name="fieldType"
          label="Field Type"
          options={[
            { label: "Mandatory", value: "mandatory" },
            { label: "Non Madatory", value: "non mandatory" },
          ]}
        />
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>Name Components</Box>
        <Box>Mandatory</Box>
      </Box>
      <Box mt={2}>
        <DragDropContext
          onDragEnd={(result) => {
            const { source, destination } = result;

            if (!destination) return;

            if (source.droppableId === destination.droppableId) {
              if (source.index === destination.index) return;
              let newData = reorder(data, source.index, destination.index);
              setData(newData);
              return;
            }
          }}
        >
          <Droppable droppableId="droppable">
            {(provided: any, snapshot: any) => (
              <Box
                ref={(ref) => {
                  provided.innerRef(ref);
                }}
              >
                {data.map((item: any, index: number) => (
                  <Draggable
                    key={item.label.toString()}
                    draggableId={item.label.toString()}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <Box
                        mt={3}
                        pl={3}
                        sx={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                        active={active ? 1 : 0}
                        onMouseOver={() => setActive(true)}
                        onMouseLeave={() => setActive(false)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isdragging={snapshot.isDragging ? 1 : 0}
                        name={item.label}
                        label={item.label}
                        control={control}
                        draggablestyle={provided.draggableProps.style}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "25px",
                            height: "95%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "#22222226",
                            borderTopLeftRadius: "3px",
                            borderBottomLeftRadius: "3px",
                          }}
                        >
                          <Icon>
                            <DragIndicatorIcon />
                          </Icon>
                        </Box>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            px: "10px",
                          }}
                        >
                          <Typography>{item.label}</Typography>
                          <Box>{renderAdornment(item)}</Box>
                        </Box>
                        <FormCheckbox
                          name="mandatoryCheck"
                          control={control}
                          sx={{ width: "auto", m: 0, p: 0 }}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Box mt={2} px={1}>
        <Typography variant="caption">Title Elements</Typography>
        <FormRadioAddable
          control={control}
          options={titleElements}
          onAdd={onAdd}
          onDelete={onDelete}
        />
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
        <LoadingButton
          loading={false}
          fullWidth
          type="submit"
          loadingColor="white"
          title="Create Field"
          color="secondary"
        />
      </Box>
    </>
  );
};

export default Number;
