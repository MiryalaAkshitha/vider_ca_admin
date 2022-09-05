import { Box, Typography } from "@mui/material";
import { StyledFile, StyledSingleLineContainer } from "views/clients/styles";
import { renderFile } from "./renderFile";

function File({ data }) {
  const thumbnail = data?.thumbnails[0]?.large?.url || "";

  return (
    <StyledFile onDoubleClick={() => window.open(data?.webUrl)}>
      <Box
        width="100%"
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        {thumbnail ? (
          <img
            alt={data?.name}
            style={{
              position: "absolute",
              margin: "auto",
              objectFit: "contain",
              width: "95%",
              height: "100%",
            }}
            src={thumbnail}
          />
        ) : (
          renderFile(data?.file)
        )}
      </Box>
      <Box bgcolor="#FBF9F2" p={1} display="flex" gap={1} alignItems="center">
        <Box sx={{ width: "100%", flex: 1 }}>
          <StyledSingleLineContainer>
            <Typography variant="body2">{data?.name}</Typography>
          </StyledSingleLineContainer>
        </Box>
      </Box>
    </StyledFile>
  );
}

export default File;
