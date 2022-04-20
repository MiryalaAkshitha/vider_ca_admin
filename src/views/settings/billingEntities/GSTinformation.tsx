import { CloseOutlined } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";
import UploadImage from "components/UploadImage";
import SectionWrapper from "../organization/SectionWrapper";
import { StyledAttachment } from "../organization/styles";

function GstInformation({ state, setState }) {
  const handleChange = (e: any) => {
    setState((draft: any) => {
      draft[e.target.name] = e.target.value;
    });
  };

  return (
    <SectionWrapper title="GST Information">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GST Number"
            name="registrationNumber"
            value={state.registrationNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
            GST Attachment
          </Typography>
          {state.gstAttachment ? (
            <StyledAttachment>
              <a
                href={state.gstAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  gutterBottom
                  variant="body2"
                  color="rgba(0,0,0,0.8)"
                >
                  {state.gstAttachment}
                </Typography>
              </a>
              <CloseOutlined
                onClick={() =>
                  setState((draft: any) => {
                    draft.gstAttachment = "";
                  })
                }
                sx={{ cursor: "pointer" }}
                fontSize="small"
              />
            </StyledAttachment>
          ) : (
            <UploadImage
              name="gstAttachment"
              widthoutIcon
              sx={{
                minHeight: "80px",
              }}
              onChange={(v) =>
                setState((draft: any) => {
                  draft.gstAttachment = v;
                })
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PAN Number"
            name="panNumber"
            value={state.panNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="body2" color="rgba(0,0,0,0.6)">
            Pancard Attachment
          </Typography>
          {state.panAttachment ? (
            <StyledAttachment>
              <a
                href={state.panAttachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  gutterBottom
                  variant="body2"
                  color="rgba(0,0,0,0.8)"
                >
                  {state.panAttachment}
                </Typography>
              </a>
              <CloseOutlined
                onClick={() =>
                  setState((draft: any) => {
                    draft.panAttachment = "";
                  })
                }
                sx={{ cursor: "pointer" }}
                fontSize="small"
              />
            </StyledAttachment>
          ) : (
            <UploadImage
              name="panAttachment"
              widthoutIcon
              sx={{
                minHeight: "80px",
              }}
              onChange={(v) =>
                setState((draft: any) => {
                  draft.panAttachment = v;
                })
              }
            />
          )}
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}

export default GstInformation;
