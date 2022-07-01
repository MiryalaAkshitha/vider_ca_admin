import { Box, Grid, Typography } from "@mui/material";
import { getForm } from "api/services/forms";
import { icons } from "assets";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getFileSize } from "utils";
import { FILETYPES } from "utils/constants";
import { FormBuilderFieldTypes } from "views/forms/utils/renderFieldsComponent";
import { renderFieldValue } from "views/forms/utils/renderFieldValue";

function ViewIproEntry() {
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm
  );

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        maxWidth: 1200,
        width: "95%",
        margin: "auto",
      }}
    >
      {data?.data?.pages?.map((item: any, index: number) => (
        <Box
          key={index}
          mb={3}
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
              background: "rgb(24, 47, 83, 0.05)",
              p: 2,
            }}
          >
            <Typography variant="subtitle2" color="primary">
              {item?.name}
            </Typography>
          </Box>
          <Grid sx={{ p: 2 }} container spacing={2}>
            {item?.fields?.map((field: any, index: number) => {
              if (
                field.fieldType === FormBuilderFieldTypes.ADDRESS ||
                field.fieldType === FormBuilderFieldTypes.NAME
              ) {
                return (
                  <>
                    {field?.inputs?.map((input: any, index: number) => (
                      <Grid item xs={4} key={index}>
                        <Typography
                          mb="8px"
                          color="rgba(0,0,0,0.6)"
                          variant="body2"
                        >
                          {input?.label}
                        </Typography>
                        <Typography variant="body1">
                          {input?.value || "--"}
                        </Typography>
                      </Grid>
                    ))}
                  </>
                );
              }
              if (field.fieldType === FormBuilderFieldTypes.FILE_UPLOAD) {
                return (
                  <Grid item xs={12} key={index}>
                    <Box mb={2}>
                      <Typography
                        mb="8px"
                        color="rgba(0,0,0,0.6)"
                        variant="body2"
                      >
                        {field?.label}
                      </Typography>
                      <Box display="flex" gap={2} flexWrap="wrap">
                        {field?.value?.map((item: any, index: number) => (
                          <FilePreview key={index} file={item} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                );
              }
              return (
                <Grid item xs={4} key={index}>
                  <Box mb={2}>
                    <Typography
                      mb="3px"
                      color="rgba(0,0,0,0.6)"
                      variant="body2"
                    >
                      {field?.label}
                    </Typography>
                    <Typography variant="body1">
                      {renderFieldValue(field)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

const FilePreview = ({ file }: any) => (
  <Box
    sx={{
      border: "1px solid rgba(0,0,0,0.1)",
      borderRadius: "8px",
      padding: "5px",
      display: "flex",
      gap: 2,
      maxWidth: "300px",
    }}
  >
    <Box>
      <a href={file?.url} target="_blank" rel="noopener noreferrer">
        <img
          src={file?.type === FILETYPES.PDF ? icons.pdf : file?.url}
          alt={file?.name}
          style={{
            width: 50,
            height: 40,
            objectFit: "contain",
          }}
        />
      </a>
    </Box>
    <Box flex={1} width="100%">
      <Typography variant="body2">{file?.name}</Typography>
      <Typography variant="caption" color="rgba(0,0,0,0.5)">
        {getFileSize(file?.size)}
      </Typography>
    </Box>
  </Box>
);

export default ViewIproEntry;
