import { Box, Typography, Button } from "@mui/material";
import { getForm } from "api/services/forms";
import Loader from "components/Loader";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import useSnack from "hooks/useSnack";

function IProShareLink() {
  const params = useParams();
  const snack = useSnack();

  const { data, isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm
  );
  const URL = process.env.REACT_APP_WEBSITE_URL || "";
  const link = `${URL}/forms/access/${data?.data?._id}`;

  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(link).then(
      function () {
        navigator.clipboard.readText().then(() => {
          snack.success("Link copied. You can share now.");
        });
      },
      function (err) {
        snack.error(err);
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
      }}
    >
      <Box
        sx={{
          border: "1px solid lightgrey",
          borderRadius: "5px",
          background: "#F9FAFC",
        }}
      >
        <Box
          p={2}
          display="flex"
          justifyContent="space-between"
          borderBottom="1px solid lightgrey"
          alignItems="center"
        >
          <Typography variant="h6">Form Link</Typography>
          <Typography variant="body2">
            Updated at:{" "}
            {moment(data?.data?.updatedAt).format("MMM DD, YYYY hh:mm A")}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography variant="body2" color="#0D47A1">
            {link}
          </Typography>
        </Box>
      </Box>
      <Box mt={1} textAlign="right">
        <Button
          onClick={handleCopyLink}
          color="secondary"
          startIcon={<LinkRoundedIcon />}
        >
          Copy link
        </Button>
      </Box>
    </Box>
  );
}

export default IProShareLink;
