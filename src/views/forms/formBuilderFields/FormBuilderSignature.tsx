import { Box, Button, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

interface Props {
  label?: string;
  name: string;
  control: any;
  required?: boolean;
  item?: any;
}

function FormBuilderSignature(props: Props) {
  const { name, control, label = "", required = false, item } = props;
  const params = useParams();

  const handleClick = () => {
    let formId = params.formId;
    let fieldId = item?._id;
    let path = `/forms/${formId}/fields/${fieldId}/esign`;
    window.open(path, "_blank");
  };

  return (
    <>
      <Typography gutterBottom variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Box
              sx={{
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "4px",
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box flex={1}>
                <Typography>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item?.signatureDocument[0]?.url}
                    style={{
                      color: "rgb(85, 26, 139)",
                      textDecoration: "none",
                    }}
                  >
                    {item?.signatureDocument[0]?.name}
                  </a>
                </Typography>
                {field?.value && (
                  <Box display="flex" mt={1} gap={1} alignItems="center">
                    <Typography> Signed document:</Typography>
                    <Typography>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={field?.value?.url}
                        style={{
                          color: "rgb(85, 26, 139)",
                          textDecoration: "none",
                        }}
                      >
                        {field?.value?.name}
                      </a>
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box>
                <Button onClick={handleClick} color="secondary">
                  Complete E-Sign or DSC
                </Button>
              </Box>
            </Box>
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormBuilderSignature;
