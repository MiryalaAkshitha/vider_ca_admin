import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { StyledLabel } from "views/labels/styles";
import ProfileImage from "./ProfileImage";

interface IProfileProps {
  data: any;
  onUpdate: () => void;
  setState: (state: any) => void;
}

function Profile({ data, setState, onUpdate }: IProfileProps) {
  const navigate = useNavigate();

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
              src={data?.imageUrl}
              onChange={(v: string) => setState({ ...data, image: v })}
            />
            <Box flex={1}>
              <Typography variant="subtitle2">{data?.displayName}</Typography>
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
          <div>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              Client ID
            </Typography>
            <Typography variant="body2" color="primary">
              {data?.clientId}
            </Typography>
          </div>
          {data?.dob && (
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Date of birth
              </Typography>
              <Typography variant="body2" color="primary">
                {moment(data?.dob).format("DD MMM, YYYY")}
              </Typography>
            </div>
          )}
          {data?.panNumber && (
            <div>
              <Typography variant="caption" color="textSecondary" gutterBottom>
                Pan Number
              </Typography>
              <Typography variant="body2" color="primary">
                {data?.panNumber}
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
              +91 {data?.mobileNumber}
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
        <Box>
          <Button
            onClick={() => {
              navigate(`/task-board?client=${data?.id}`);
            }}
            variant="outlined"
            color="secondary"
          >
            View Tasks
          </Button>
        </Box>
        <Box>
          <Button onClick={onUpdate} variant="outlined" color="secondary">
            Update Profile
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
