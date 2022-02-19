import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { StyledLabel } from "views/labels/styles";
import ProfileImage from "./ProfileImage";

interface IProfileProps {
  data: any;
  onUpdate: () => void;
  setState: (state: any) => void;
}

function Profile({ data, setState, onUpdate }: IProfileProps) {
  return (
    <Box
      sx={{
        p: 1,
        background: "#FBF9F2",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box flex={1}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Box maxWidth={400} display="flex" gap={2} alignItems="center">
            <ProfileImage
              src={data?.logoUrl}
              onChange={(v: string) => setState({ ...data, logo: v })}
            />
            <Box flex={1}>
              <Typography variant="subtitle2">{data?.companyName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {data?.category}
              </Typography>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {data?.labels?.map((item: any, index: number) => (
                  <StyledLabel key={index} color={"rgba(20, 158, 205,0.1)"}>
                    <Typography color="black" variant="caption">
                      {item?.name}
                    </Typography>
                  </StyledLabel>
                ))}
              </Box>
            </Box>
          </Box>
          {data?.panNumber && (
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                GST Number
              </Typography>
              <Typography variant="body2" color="primary">
                {data?.gstNumber}
              </Typography>
            </div>
          )}
        </Box>
      </Box>
      <Box display="flex" gap={3} alignItems="center">
        <Box textAlign="right">
          <Typography variant="body2" gutterBottom color="#149ECD">
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href={`mailto:${data?.email}`}
            >
              +91 {data?.mobile}
            </a>
          </Typography>
          <Typography variant="body2" color="#149ECD">
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href={`mailto:${data?.email}`}
            >
              {data?.email}
            </a>
          </Typography>
        </Box>
        <div>
          <Button onClick={onUpdate} variant="outlined" color="secondary">
            Update Profile
          </Button>
        </div>
      </Box>
    </Box>
  );
}

export default Profile;