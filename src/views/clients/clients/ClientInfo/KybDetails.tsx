import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteKybForm, updateKybfields } from "api/services/client-info";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { renderField } from "views/clients/clients/ClientInfo/renderField";
import AddCustomField from "./AddCustomField";

interface IKybDetailsProps {
  selectedForm: any;
}

function KybDetails({ selectedForm }: IKybDetailsProps) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const confirm = useConfirm();
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setState(selectedForm?.kybFields || []);
  }, [selectedForm]);

  const onChange = (field: any, value: any) => {
    const newFields: any = [...state];
    const index = newFields.findIndex((item: any) => item.id === field?.id);
    newFields[index].value = value;
    setState(newFields);
  };

  const { mutate } = useMutation(deleteKybForm, {
    onSuccess: () => {
      snack.success("Fields Deleted");
      queryClient.invalidateQueries("kyb-info");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: updateKyb } = useMutation(updateKybfields, {
    onSuccess: () => {
      snack.success("Kyb Info Updated");
      setEditable(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    updateKyb({
      data: state,
    });
  };

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        mutate({ formId: selectedForm?.id });
      },
    });
  };

  return (
    <>
      {state?.length > 0 && (
        <>
          <Box
            mt={2}
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              mb={1}
              justifyContent="space-between"
              sx={{
                background: "#f5f5f5",
                px: 2,
                py: 1,
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="primary">
                  {selectedForm?.name}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                {editable ? (
                  <>
                    <Button
                      startIcon={<Add />}
                      onClick={() => {
                        setOpen(true);
                      }}
                      size="small"
                      color="secondary"
                    >
                      Add custom field
                    </Button>
                    <Button
                      startIcon={<Save />}
                      onClick={handleUpdate}
                      size="small"
                      color="secondary"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      startIcon={<Edit />}
                      onClick={() => {
                        setEditable(true);
                      }}
                      sx={{ minWidth: 40 }}
                      size="small"
                      color="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<Delete />}
                      onClick={handleDelete}
                      sx={{ minWidth: 40 }}
                      size="small"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Box>
            </Box>
            <Box p={2}>
              {editable ? (
                <Grid container spacing={2}>
                  {state?.map((field, index) => (
                    <Grid item xs={12} key={index}>
                      {renderField(field, (value: any) =>
                        onChange(field, value)
                      )}
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid container justifyContent="space-between">
                  {state?.map((field: any, index: number) => (
                    <Grid item xs={2} key={index}>
                      <Typography
                        gutterBottom
                        variant="body2"
                        color="rgba(0,0,0,0.5)"
                      >
                        {field?.name}
                      </Typography>
                      {field?.fieldType === "file" ? (
                        <Box sx={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                          {field?.fileUrl ? (
                            <a
                              target="_blank"
                              href={field?.fileUrl}
                              rel="noopener noreferrer"
                              style={{ textDecoration: "none" }}
                            >
                              <Typography
                                color="primary"
                                gutterBottom
                                variant="body1"
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {field?.value}
                              </Typography>
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </Box>
                      ) : (
                        <Typography
                          color="primary"
                          gutterBottom
                          variant="body1"
                        >
                          {field?.value || "N/A"}
                        </Typography>
                      )}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Box>
          <AddCustomField open={open} setOpen={setOpen} form={selectedForm} />
        </>
      )}
    </>
  );
}

export default KybDetails;
