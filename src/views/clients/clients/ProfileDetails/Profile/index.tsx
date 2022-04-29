import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import ProfileImage from "./ProfileImage";

interface IProfileProps {
  data: any;
  onUpdate: () => void;
  setState: (state: any) => void;
}

function Profile({ data, setState }: IProfileProps) {
  const navigate = useNavigate();
  console.log(data.category);

  return (
    <Box
      sx={{
        width: "120px",
        height: "120px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {data.category === "individual" && (
          <Typography variant="caption" sx={{ fontSize: "10px" }}>
            Client photo
          </Typography>
        )}
        {data.category === "company" && (
          <Typography variant="caption" sx={{ fontSize: "10px" }}>
            Client Logo
          </Typography>
        )}
        <Box sx={{ position: "absolute", top: 10, right: 10 }}>
          <EditProfile
            onChange={(v: string) => setState({ ...data, image: v })}
          />
        </Box>
      </Box>

      <ProfileImage
        src={data?.imageUrl}
        onChange={(v: string) => setState({ ...data, image: v })}
      />
    </Box>
  );
}

export default Profile;
