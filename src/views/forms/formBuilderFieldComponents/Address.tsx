import { Box, Typography } from "@mui/material";
import FormInput from "components/FormFields/FormInput";
import FormRadio from "components/FormFields/FormRadio";
import FormSelect from "components/FormFields/FormSelect";
import LoadingButton from "components/LoadingButton";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorder } from "views/taskboard/board/utils";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Icon from "@mui/material/Icon";
import FormInputWithAdornment from "components/FormFields/FormInputWithAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormCheckbox from "components/FormFields/FormCheckbox";

const Address = (props) => {
  const { control } = props;
  const [active, setActive] = useState<boolean>(false);
  const [data, setData] = useState([
    {
      label: "Street Address",
      value: "streetAddress",
      isMandatory: false,
      isVisible: true,
    },
    {
      label: "AddressLine 2",
      value: "addressline2",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "District",
      value: "district",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "City",
      value: "city",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "State/Province/Region",
      value: "state",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "Country",
      value: "country",
      isMandatory: true,
      isVisible: false,
    },
    {
      label: "Pincode",
      value: "pincode",
      isMandatory: true,
      isVisible: false,
    },
  ]);

  const handleVisibility = (label) => {
    console.log(label);
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
        <Box>Address Components</Box>
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
                        <FormInputWithAdornment
                          endAdornment={renderAdornment(item)}
                          name="item"
                          label={item.label}
                          control={control}
                        />
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

export default Address;
