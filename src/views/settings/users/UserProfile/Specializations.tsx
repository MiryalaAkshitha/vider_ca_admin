import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { updateProfile } from "api/services/users";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import SectionWrapper from "./SectionWrapper";
import AddSpecification from "./AddSpecification";

const Specializations = ({ data }) => {
  const queryClient = useQueryClient();

  const [editable, setEditable] = useState(false);
  const [state, setState] = useState({
    specializations: [],
  });

  useEffect(() => {
    setState({
      specializations: data?.profile?.specializations || [],
    });
  }, [data]);

  const { mutate } = useMutation(updateProfile, {
    onSuccess: () => {
      snack.success("Profile updated successfully");
      queryClient.invalidateQueries("user-profile");
      setEditable(false);
    },
    onError: () => {
      snack.error("Error updating profile");
    },
  });

  const handleSubmit = () => {
    mutate({
      ...state,
      id: data?.id,
      type: "user",
    });
  };

  return (
    <SectionWrapper
      editable={editable}
      onSave={handleSubmit}
      setEditable={setEditable}
      title="Specializations"
    >
      <Box p={2} display="flex" gap={2} flexWrap="wrap">
        {!editable ? (
          <>
            {state.specializations?.length ? (
              state.specializations.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    background: "#F5F5F5",
                    borderRadius: 2,
                    overflow: "hidden",
                    py: 1,
                    px: 2,
                    minWidth: 80,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">{tag}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No Specifications</Typography>
            )}
          </>
        ) : (
          <EditSection state={state} setState={setState} />
        )}
      </Box>
    </SectionWrapper>
  );
};

const EditSection = ({ state, setState }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box display="flex" gap={2} flexWrap="wrap">
        {state.specializations?.map((tag: any, index: number) => (
          <Box
            key={index}
            onClick={() => {
              setState({
                ...state,
                specializations: state.specializations.filter(
                  (item: any, i: number) => i !== index
                ),
              });
            }}
            sx={{
              background: "#F5F5F5",
              borderRadius: 2,
              overflow: "hidden",
              py: 1,
              px: 2,
              minWidth: 80,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
          >
            <Typography variant="body2">{tag}</Typography>
            <Typography variant="body1">&times;</Typography>
          </Box>
        ))}
        <Button
          startIcon={<Add />}
          onClick={() => setOpen(true)}
          color="secondary"
        >
          Add specification
        </Button>
      </Box>
      <AddSpecification
        onAdd={(value) =>
          setState({
            ...state,
            specializations: [...state.specializations, value],
          })
        }
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default Specializations;
