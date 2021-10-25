import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { http } from "api/http";
import { icons } from "assets";
import useSnack from "hooks/useSnack";
import { useState } from "react";

function ProfileImage({ src, onChange }: any) {
  const [hover, setHover] = useState(false);
  const snack = useSnack();
  const [url, setUrl] = useState(null);

  const uploadImage = (e: any) => {
    if (!e.target.files[0]) return;
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    http
      .post("/common/upload", formData)
      .then((res: any) => {
        setUrl(res.data.Location);
        onChange(res.data.key);
      })
      .catch((err) => {
        snack.error("error occurred");
      });
  };

  return (
    <>
      <label htmlFor='profile'>
        <Box
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            width: 70,
            height: 70,
            position: "relative",
            borderRadius: "50%",
          }}>
          <img
            src={url ?? src ?? icons.user}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt=''
          />
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "100%",
              opacity: hover ? 1 : 0,
              height: "100%",
              display: "flex",
              transition: "0.3s",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              cursor: "pointer",
            }}>
            <Typography variant='caption' color='white'>
              Change
            </Typography>
          </Box>
        </Box>
      </label>
      <input
        onChange={uploadImage}
        type='file'
        style={{ display: "none" }}
        id='profile'
      />
    </>
  );
}

export default ProfileImage;
