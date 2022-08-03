import { Grid, TextField } from "@mui/material";
import UploadImage from "components/UploadImage";
import Section from "./Section";

function AdditionalInformation() {
  return (
    <Section title="Additional Information">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Notes"
            placeholder="Write your notes here..."
            rows={3}
            multiline
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <UploadImage
            sx={{ minHeight: "100px" }}
            name="attachment"
            label="Upload Attachment"
            onChange={(v) => console.log(v)}
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default AdditionalInformation;
